const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


exports.setUser = async (req, res) => {

    let { user_id, username, canvas_courses, settings, user_stats, canvas_api_token } = req.body;
    req.session.user_id = user_id;
    req.session.username = username;
    req.session.canvas_courses = canvas_courses;
    req.session.settings = settings;
    req.session.user_stats = user_stats;
    req.session.canvas_api_token = canvas_api_token;

    // Define default settings
    const defaultSettings = {
        theme: 'light', // Default theme
        notifications: true, // Enable notifications by default
        // Add more settings as needed
    };

    // Define default user stats
    const defaultUserStats = {
        average_completion_time: 0, // Default average completion time
        average_grade: 0, // Default average grade
        total_tasks_completed: 0, // Default total tasks completed
        // Add more stats as needed
    };

    console.log('Session user_id set:', req.session.user_id);

    try {
        // Check if user_data exists
        const existingUserData = await prisma.user_data.findUnique({
            where: { id: user_id },
        });

        if (!existingUserData) {
        
            // if (canvas_courses) console.log("canvas_courses is set to: \n", canvas_courses);

            // Set defaults if no info provided
            username = username || user_id;
            canvas_courses = canvas_courses || [];
            settings = settings || defaultSettings;
            user_stats = user_stats || defaultUserStats;
            canvas_api_token = canvas_api_token || "";

            // Create default user_data if it doesn't exist
            await prisma.user_data.create({
                data: {
                    id: user_id,
                    username: username, // Set a default username or get it from the request
                    canvas_api_token: canvas_api_token, // Set a default or empty token
                    canvas_courses: canvas_courses,
                    settings: settings,
                    user_stats: user_stats,
                },
            });
            
            res.send({ message: 'User set successfully' });

        // If user data DNE, tell the user to use /update-user!
        } else {
            res.send({ message: 'User already found, use /update-user if you would like to update the user' });
            console.log(`Attempted to create user that already exists: ${user_id}, but was denied`);
        }

        
    } catch (error) {
        console.error('Error setting user:', error);
        res.status(500).send('Internal Server Error');
    }
}


exports.getTasks = async (req, res) => {
    try {
        // Check if user_id is set in the session
        if (!req.session.user_id) {
          return res.status(401).send({ message: 'User not set in session' });
        }
    
        // Query tasks by user_id and sort by priority
        const tasks = await prisma.task_data.findMany({
          where: {
            user_id: req.session.user_id,
          },
          orderBy: {
            priority: 'asc', // Use 'desc' for descending order
          },
        });
    
        res.json(tasks);
      } catch (error) {
        console.error('Error fetching tasks:', error);
        res.status(500).send('Internal Server Error');
      }
}