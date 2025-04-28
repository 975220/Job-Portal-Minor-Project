import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { getAdminJobs, getAllJobs, getJobById, postJob, deleteJob } from "../controllers/job.controller.js";

const router = express.Router();

// Admin will post a job
router.route("/post").post(isAuthenticated, postJob);

// Get all jobs (for students)
router.route("/get").get(isAuthenticated, getAllJobs);

// Get all jobs posted by Admin
router.route("/getadminjobs").get(isAuthenticated, getAdminJobs);

// Get single job by ID
router.route("/get/:id").get(isAuthenticated, getJobById);

// Delete job by ID (Admin)
router.route("/delete/:id").delete(isAuthenticated, deleteJob);

export default router;
