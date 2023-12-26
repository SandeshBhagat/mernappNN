const workoutModel = require('../models/workoutModel');
const mongoose = require('mongoose');

// get all
const getAllWorkouts = async (req, res) => {
	const workouts = await workoutModel.find({}).sort({ createdAt: -1 });

	res.status(200).json(workouts);
};

// get single

const getSingleWorkout = async (req, res) => {
	const { id } = req.params;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ error: 'invalid ID for workout' });
	}
	const workout = await workoutModel.findById(id);
	if (!workout) {
		return res.status(404).json({ error: 'no such workout!' });
	}

	res.status(200).json(workout);
};

// create new

const createWorkout = async (req, res) => {
	const { title, reps, load } = req.body;

	let emptyFields = [];

	if(!title){
		emptyFields.push('title')
	}
	if(!load){
		emptyFields.push('load')
	}
	if(!reps){
		emptyFields.push('reps')
	}

	if(emptyFields.length > 0){
       return res.status(400).json({error:'Please fill in all the fields', emptyFields})
	}

	try {
		const workoutMdl = await workoutModel.create({ title, reps, load });
		res.status(200).json(workoutMdl);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

// delete

const deleteWorkout = async (req, res) => {
	const { id } = req.params;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ error: 'invalid ID for workout' });
	}
	const workout = await workoutModel.findOneAndDelete({ _id: id });

	if (!workout) {
		return res.status(400).json({ error: 'no such workout!' });
	}

	res.status(200).json(workout);
};

// update

const updateWorkout = async (req, res) => {
	const { id } = req.params;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ error: 'invalid ID for workout' });
	}

	const workout = await workoutModel.findOneAndUpdate(
		{ _id: id },
		{
			...req.body,
		},
	);

	if (!workout) {
		return res.status(400).json({ error: 'no such workout!' });
	}

	res.status(200).json(workout);
};

// export functions
module.exports = {
	getAllWorkouts,
	getSingleWorkout,
	createWorkout,
	deleteWorkout,
	updateWorkout,
};
