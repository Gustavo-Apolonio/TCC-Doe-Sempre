export function ValidateDocument(value: string, isCpf: boolean): boolean {
  const cleanValue = value.replace(/\D/g, "");

  if (isCpf) {
    return validateCPF(cleanValue);
  } else {
    return validateCNPJ(cleanValue);
  }
}

function validateCPF(cpf: string): boolean {
  if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) {
    return false;
  }

  let sum = 0;
  let remainder;

  for (let i = 1; i <= 9; i++) {
    sum += parseInt(cpf[i - 1]) * (11 - i);
  }

  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cpf[9])) return false;

  sum = 0;
  for (let i = 1; i <= 10; i++) {
    sum += parseInt(cpf[i - 1]) * (12 - i);
  }

  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  return remainder === parseInt(cpf[10]);
}

function validateCNPJ(cnpj: string): boolean {
  if (cnpj.length !== 14 || /^(\d)\1+$/.test(cnpj)) {
    return false;
  }

  const weightsFirst = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  const weightsSecond = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

  const calculateDigit = (digits: string, weights: number[]) => {
    const sum = digits
      .split("")
      .map((digit, index) => parseInt(digit) * weights[index])
      .reduce((acc, curr) => acc + curr, 0);

    const remainder = sum % 11;
    return remainder < 2 ? 0 : 11 - remainder;
  };

  const firstDigit = calculateDigit(cnpj.slice(0, 12), weightsFirst);
  if (firstDigit !== parseInt(cnpj[12])) return false;

  const secondDigit = calculateDigit(cnpj.slice(0, 13), weightsSecond);
  return secondDigit === parseInt(cnpj[13]);
}
