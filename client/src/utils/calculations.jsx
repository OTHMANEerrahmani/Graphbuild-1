
function CalculateSenario({
  lead,
  cpl,
  prd_price,
  prix_vente,
  confirmation_rate,
  delivred_rate,
}) {
  // const confirmation_rate = confirmation_rate / 100;
  // const delivred_rate = delivred_rate / 100;

  const delivred = lead * confirmation_rate * delivred_rate;
  const returned = lead * confirmation_rate - delivred;

  const Gdelivred = 4.99 * delivred;
  const Greturn = returned * 3.99;

  const product_sold = lead * prd_price * confirmation_rate * delivred_rate;

  const call_center =
    lead * 0.5 +
    lead * confirmation_rate * 1 +
    lead * confirmation_rate * delivred_rate * 2;

  const sales = prix_vente * lead * confirmation_rate * delivred_rate;

  const ads = lead * cpl;

  const profit = sales - Gdelivred - Greturn - call_center - product_sold - ads;

  const statusColor = profit > 1 ? "bg-green-500" : "bg-red-500";

  return (
    <div
      className={`px-4 py-1 text-center rounded-full text-black ${statusColor}`}
    >
      {profit.toFixed(2)}
    </div>
  );
}

export default CalculateSenario;
