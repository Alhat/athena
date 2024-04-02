/**
 * 
 * The move is given a certain task, calculate the priority based on the task and the course.
 * This will be used during task creation.
 * 
 * So probably used in task routes?
 * 
 */


const axios = require("axios");


/**
 * 
 * @param {*} task input the task data, includes the following fields:
 *  id, course_id, created_at, description, due_date, estimated_completion_time, priority, status, sub_tasks, title, user_id
 * @param {*} course input the canvas course structure, including the fields:
 *  average_completion_time, course_grade, course_id, passing_grade
 */
async function calculatePriority(task, course) {

    // Set the coefficients to determine the weight that each will have on the priority score
    const grade_coeff = 6;
    const assignment_weight_coeff = 8;
    const avg_time_coeff = 3;
    const due_date_coeff = 10;

    // Gets the day
    const due_date = task.due_date / 86400000;

    // Set the different terms in priority equation
    const avg_time = avg_time_coeff * course.average_completion_time;
    const assignment_weight = assignment_weight_coeff * task.weight;
    const inv_course_grade = 1 / (grade_coeff * course.course_grade);
    const inv_due_date = 1 / (due_date_coeff * due_date);

    // The higher the priority number, the higher the priority
    const priority = avg_time * assignment_weight * inv_course_grade * inv_due_date;
    return priority;

}

async function manuallyUpdatePriority(task, number) {

    task.priority = number;
    return task;
}