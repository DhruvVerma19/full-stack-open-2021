interface BmiValues {
    cm_height: number;
    kg_weight: number;
  }
  
  export const parseBmiArguments = (
    height: number,
    weight: number
  ): BmiValues => {
    if (!isNaN(height) && !isNaN(weight)) {
      return {
        cm_height: height,
        kg_weight: weight
      };
    } else {
      throw new Error('Provided values were not numbers!');
    }
  };
  
  export const calculateBmi = (
    cm_height: number,
    kg_weight: number
  ): string => {
    const bmi = (kg_weight / cm_height / cm_height) * 10000;
    
    switch(true){
        case (bmi < 15):
            return 'Very severely underweight';
            break;
        
        case (bmi > 15 && bmi < 16):
            return 'Severely underweight';
            break;
        case (bmi > 16 && bmi < 18.5):
            return 'Underweight';
            break;
        case (bmi > 18.5 && bmi < 25):
            return 'Normal (healthy weight)';
            break;
        case (bmi > 25 && bmi < 30):
            return 'Overweight';
            break;
        case (bmi > 30 && bmi < 35):
            return 'Obese Class I (Moderately obese)';
            break;
        case (bmi > 35 && bmi < 40):
            return 'Obese Class II (Severely obese)';
            break;
        default:
            return 'Obese Class III (Very severely obese)';
            break;
            
    }

  };