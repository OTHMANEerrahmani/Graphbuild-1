import numpy as np
import pandas as pd
import nltk
from nltk.stem.snowball import SnowballStemmer
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

nltk.download('punkt')
nltk.download('wordnet')

data = pd.read_csv('amazon_product.csv')
data = data.drop('id', axis=1)

stemmer = SnowballStemmer('english')

def tokenize_and_stem(text):
    tokens = nltk.word_tokenize(text.lower())
    stems = [stemmer.stem(t) for t in tokens]
    return stems

data['stemmed_tokens'] = data.apply(lambda row: tokenize_and_stem(row['Title'] + ' ' + row['Description']), axis=1)

tfidf_vectorizer = TfidfVectorizer(tokenizer=tokenize_and_stem)

def cosine_sim(text1, text2):
    text1_concatenated = ' '.join(text1)
    text2_concatenated = ' '.join(text2)
    tfidf_matrix = tfidf_vectorizer.fit_transform([text1_concatenated, text2_concatenated])
    return cosine_similarity(tfidf_matrix)[0][1]

def search_products(query):
    query_stemmed = tokenize_and_stem(query)
    data['similarity'] = data['stemmed_tokens'].apply(lambda x: cosine_sim(query_stemmed, x))
    results = data.sort_values(by=['similarity'], ascending=False).head(10)[['Title', 'Description', 'Category']]
    return results.to_json(orient='records')

if __name__ == "__main__":
    import sys
    query = sys.argv[1]
    print(search_products(query), end='')
