const express = require('express');
const {
	getAllWorkouts,
	getSingleWorkout,
	createWorkout,
    deleteWorkout,
    updateWorkout
} = require('../controllers/workoutController');

const router = express.Router();
// get all
router.get('/', getAllWorkouts);
//get single
router.get('/:id', getSingleWorkout);
//post a workout
router.post('/', createWorkout);
//delete a workout
router.delete('/:id',deleteWorkout);
//update a workout
router.patch('/:id', updateWorkout);

module.exports = router;
