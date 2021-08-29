import express from 'express';
import { parseBmiArguments, calculateBmi } from './bmiCalculator';
import {  parseExerciseArguments,  exerciseCalculator} from './exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const weight = req.query.weight;
  const height = req.query.height;

  if (!weight || !height) {
    res.status(400);
    res.send({ error: 'missing parameter height or weight' });
  } else {
    try {
      const { cm_height, kg_weight } = parseBmiArguments(
        Number(height),
        Number(weight)
      );
      const bmi = calculateBmi(cm_height, kg_weight);
      res.send({
        weight: kg_weight,
        height: cm_height,
        bmi: bmi
      });
    } catch (e) {
      res.status(400);
      res.send({ error: e.message });
    }
  }
});

app.post('/exercises', (req, res) => {
  const dailyExercises = req.body.daily_exercises;
  const dailyTarget = req.body.target;

  if (!dailyExercises || !dailyTarget) {
    res.status(400);
    res.send({ error: 'missing parameter daily_exercises or target' });
  } else {
    try {
      const { target, daily_exercise_hr } = parseExerciseArguments(
        dailyTarget,
        dailyExercises
      );
      res.send(exerciseCalculator(target, daily_exercise_hr));
    } catch (e) {
      res.status(400);
      res.send({ error: e.message });
    }
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});