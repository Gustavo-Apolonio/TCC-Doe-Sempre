import { ICupomTicket } from "@/store/states/cupoms/slices";

function GenerateCustomDescount(foodQuantity: number, clotheQuantity: number): number {
  const avg = Math.ceil((foodQuantity + clotheQuantity) / 2);

  let resp = avg;

  if (avg < 10) resp *= 10;
  if (avg > 100) resp /= 100;

  return resp * 1.5;
}

export function GenerateCupomByValues(availableCupoms: ICupomTicket[], itemType: number, foodQuantity: number, clotheQuantity: number): ICupomTicket {
  availableCupoms = availableCupoms.filter((cupom) => cupom.active);
  availableCupoms = availableCupoms.filter((cupom) => {
    switch (itemType) {
      case 0:
        return cupom.name.includes('DOEC');

      case 1:
        return cupom.name.includes('DOEF');

      case 2:
      default:
        return cupom.name.includes('DOEB');
    }
  })
  const filteredByFood = availableCupoms.filter((cupom) => cupom.foodQuantity <= foodQuantity);
  const filteredByClothe = availableCupoms.filter((cupom) => cupom.clotheQuantity <= clotheQuantity);

  const combinedCupoms = Array.from(
    new Map(
      [...filteredByFood, ...filteredByClothe].map((cupom) => [cupom.id, cupom])
    ).values()
  );

  let closestCupom = combinedCupoms.reduce<ICupomTicket | null>((closest, cupom) => {
    if (
      closest === null ||
      Math.abs(cupom.foodQuantity - foodQuantity) < Math.abs(closest.foodQuantity - foodQuantity)
    ) {
      return cupom;
    }
    return closest;
  }, null);

  if (!closestCupom) {
    closestCupom = combinedCupoms.reduce<ICupomTicket | null>((closest, cupom) => {
      if (
        closest === null ||
        Math.abs(cupom.clotheQuantity - clotheQuantity) <
        Math.abs(closest.clotheQuantity - clotheQuantity)
      ) {
        return cupom;
      }
      return closest;
    }, null);
  }

  if (!closestCupom) {
    const descountAmount = GenerateCustomDescount(foodQuantity, clotheQuantity);
    closestCupom = {
      descountAmount,
      foodQuantity,
      clotheQuantity,
      name: `DOEPDESC${descountAmount.toFixed(2).replace(/\D/g, '')}`,
    };
  }

  return closestCupom;
}
