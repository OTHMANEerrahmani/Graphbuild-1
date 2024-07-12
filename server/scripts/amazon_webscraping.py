from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager
from amazoncaptcha import AmazonCaptcha
import requests
import time
import urllib.parse
import json
import sys

def solve_captcha(driver):
    try:
        captcha_image = driver.find_element(By.XPATH, '//img[contains(@src, "captcha")]')
        captcha_url = captcha_image.get_attribute('src')

        captcha_solver = AmazonCaptcha.fromlink(captcha_url)
        captcha_solution = captcha_solver.solve()

        captcha_input = driver.find_element(By.ID, 'captchacharacters')
        captcha_input.send_keys(captcha_solution)
        
        driver.find_element(By.CLASS_NAME, 'a-button-text').click()
    except Exception as e:
        print("Error solving CAPTCHA:", e)
        return False
    return True

def get_amazon_urls(query, limit=1):
    query = urllib.parse.quote_plus(query)
    URL = f"https://www.amazon.com/s?k={query}"
    
    HEADERS = {
        'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.157 Safari/537.36',
        'Accept-Language': 'en-US, en;q=0.5'
    }

    response = requests.get(URL, headers=HEADERS)
    soup = BeautifulSoup(response.content, "html.parser")
    
    urls = []
    count = 0
    for a in soup.find_all('a', class_='a-link-normal s-no-outline', href=True):
        if count >= limit:
            break
        url = "https://www.amazon.com" + a['href']
        urls.append(url)
        count += 1
    
    return urls

def main(URL):
    service = Service(ChromeDriverManager().install())
    options = webdriver.ChromeOptions()
    options.add_argument('--headless')
    options.add_argument('--no-sandbox')
    options.add_argument('--disable-dev-shm-usage')
    driver = webdriver.Chrome(service=service, options=options)

    driver.get(URL)
    
    time.sleep(3)  

    if "captcha" in driver.page_source:
        if not solve_captcha(driver):
            print("Failed to solve CAPTCHA")
            driver.quit()
            return
    
        time.sleep(3)

    page_source = driver.page_source
    soup = BeautifulSoup(page_source, "html.parser")

    driver.quit()

    product_data = {}

    # retrieving product title
    try:
        title = soup.find("span", attrs={"id": 'productTitle'}).get_text().strip().replace(',', '')
    except AttributeError:
        title = "NA"
    product_data["Product Title"] = title

    # retrieving price
    try:
        price = soup.find("span", attrs={'class': 'a-offscreen'}).get_text().strip().replace(',', '')
    except AttributeError:
        price = "NA"
    product_data["Product Price"] = price

    # retrieving product rating
    try:
        rating_element = soup.find("a", {"role": "button"}, class_='a-popover-trigger a-declarative')
        rating_span = rating_element.find("span", class_='a-size-base a-color-base')
        if rating_span:
            rating = rating_span.get_text().strip()
        else:
            rating_icon = rating_element.find("i", class_='a-icon a-icon-star a-star-4-5 cm-cr-review-stars-spacing-big')
            rating = rating_icon.find("span", class_='a-icon-alt').get_text().strip()
    except AttributeError:
        rating = "NA"
    product_data["Overall Rating"] = rating

    # retrieving review count
    try:
        review_count = soup.find("span", attrs={'id': 'acrCustomerReviewText'}).get_text().strip().replace(',', '')
    except AttributeError:
        review_count = "NA"
    product_data["Total Reviews"] = review_count

    # retrieving availability status
    try:
        available = soup.find("div", attrs={'id': 'availability'}).find("span").get_text().strip().replace(',', '')
    except AttributeError:
        available = "NA"
    product_data["Availability"] = available

    try:
        img_tag = soup.find("img", attrs={'id': 'landingImage'}) 
        if img_tag:
            image_url = img_tag.get("src")
        else:
            image_url = "NA"
    except AttributeError:
        image_url = "NA"
    product_data["Product Image"] = image_url


    return product_data

if __name__ == '__main__':
    query = sys.argv[1] 
    urls = get_amazon_urls(query)
    results = []

    for url in urls:
        result = main(url)
        if result:
            results.append(result)

    print(json.dumps(results))
