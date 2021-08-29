interface ExerciseValues {
    target: number;
    daily_exercise_hr: Array<number>;
  }
  
  export const parseExerciseArguments = (
    target: number,
    daily_exercises: Array<number>
  ): ExerciseValues => {
    if (!isNaN(target) && !daily_exercises.some(isNaN)) {
      return {
        target: target,
        daily_exercise_hr: daily_exercises
      };
    } else {
      throw new Error('Provided values were not numbers!');
    }
  };
  
  interface AverageValues {
    period_length: number;
    training_days: number;
    success: boolean;
    rating: number;
    ratin_desc: string;
    target: number;
    average: number;
  }
  
  export const exerciseCalculator = (
    target: number,
    daily_exercise_hr: Array<number>
  ): AverageValues => {
    const period_length = daily_exercise_hr.length;
    const training_days = daily_exercise_hr.filter((day) => day > 0).length;
    const average = daily_exercise_hr.reduce((a, b) => a + b, 0) / period_length;
  
    const success = average >= target ? true : false;
  
    let rating;
    let ratin_desc;
  
    if (average < target) {
      rating = 1;
      ratin_desc = 'not too bad but could be better';
    } else if (average === target) {
      rating = 2;
      ratin_desc = 'good';
    } else {
      rating = 3;
      ratin_desc = 'very good';
    }
  
    return {
      period_length: period_length,
      training_days: training_days,
      success: success,
      rating: rating,
      ratin_desc: ratin_desc,
      target: target,
      average: average
    };
  };