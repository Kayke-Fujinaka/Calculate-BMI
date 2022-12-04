type Classification = {
  [key: string]: (
    index: number
  ) =>
    | false
    | "Underweight"
    | "Normal"
    | "Overweight"
    | "Obese"
    | "Extremely Obese";
};

class BMI {
  constructor(private height: number, private weight: number) {}
  calculate() {
    const numberIsDecimal = this.height - Math.floor(this.height) !== 0;
    const calculateBMI = (this.weight / Math.pow(this.height / 100, 2)).toFixed(
      2
    );
    return numberIsDecimal
      ? "Enter height in centimeters"
      : this.classification(Number(calculateBMI));
  }

  classification(index: number) {
    const classifications: Classification = {
      underweight: () => (index < 18.5 ? "Underweight" : false),
      normal: () => (index >= 18.5 && index <= 24.9 ? "Normal" : false),
      overweight: () => (index >= 25 && index <= 29.9 ? "Overweight" : false),
      obese: () => (index >= 30 && index <= 39.9 ? "Obese" : false),
      extremelyObese: () => (index >= 40 ? "Extremely Obese" : false),
    };

    const result = Object.keys(classifications).reduce((acc, value) => {
      const classif = classifications[value](index);
      return !classif ? acc : (acc = classif);
    }, {});

    return { imc: index, classification: result };
  }
}

const bmi = new BMI(120, 17);
console.log(bmi.calculate());
