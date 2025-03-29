// Set current date
document.addEventListener('DOMContentLoaded', function() {
    // Mock data for the user
    const userData = {
        name: "Alex",
        steps: 8243,
        stepsGoal: 10000,
        calories: 645,
        caloriesGoal: 850,
        distance: 5.7,
        distanceGoal: 8.0,
        weeklyData: [
            { day: "Mon", steps: 7823, calories: 595, distance: 5.1 },
            { day: "Tue", steps: 9102, calories: 702, distance: 6.2 },
            { day: "Wed", steps: 6544, calories: 521, distance: 4.5 },
            { day: "Thu", steps: 8901, calories: 675, distance: 5.9 },
            { day: "Fri", steps: 7650, calories: 610, distance: 5.3 },
            { day: "Sat", steps: 8243, calories: 645, distance: 5.7 },
            { day: "Sun", steps: 0, calories: 0, distance: 0 }
        ]
    };

    // Set current date
    const currentDate = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById('current-date').textContent = currentDate.toLocaleDateString('en-US', options);

    // Update metrics display
    updateMetricsDisplay(userData);

    // Initialize chart
    initializeChart(userData.weeklyData);

    // Add event listeners for controls
    initializeControls();
});

function updateMetricsDisplay(userData) {
    // Update steps
    document.getElementById('steps-value').textContent = userData.steps.toLocaleString();
    document.getElementById('steps-goal').textContent = userData.stepsGoal.toLocaleString();
    const stepsProgress = (userData.steps / userData.stepsGoal) * 100;
    document.getElementById('steps-progress').style.width = `${Math.min(stepsProgress, 100)}%`;

    // Update calories
    document.getElementById('calories-value').textContent = userData.calories.toLocaleString();
    document.getElementById('calories-goal').textContent = userData.caloriesGoal.toLocaleString();
    const caloriesProgress = (userData.calories / userData.caloriesGoal) * 100;
    document.getElementById('calories-progress').style.width = `${Math.min(caloriesProgress, 100)}%`;

    // Update distance
    document.getElementById('distance-value').textContent = userData.distance.toLocaleString();
    document.getElementById('distance-goal').textContent = userData.distanceGoal.toLocaleString();
    const distanceProgress = (userData.distance / userData.distanceGoal) * 100;
    document.getElementById('distance-progress').style.width = `${Math.min(distanceProgress, 100)}%`;

    // Update goal inputs
    document.getElementById('steps-goal-input').value = userData.stepsGoal;
    document.getElementById('calories-goal-input').value = userData.caloriesGoal;
    document.getElementById('distance-goal-input').value = userData.distanceGoal;
}

function initializeChart(weeklyData) {
    const ctx = document.getElementById('weekly-chart').getContext('2d');
    
    const chartData = {
        labels: weeklyData.map(day => day.day),
        datasets: [
            {
                label: 'Steps',
                data: weeklyData.map(day => day.steps),
                backgroundColor: 'rgba(83, 144, 217, 0.2)',
                borderColor: 'rgba(83, 144, 217, 1)',
                borderWidth: 2,
                tension: 0.4,
                yAxisID: 'y'
            },
            {
                label: 'Calories',
                data: weeklyData.map(day => day.calories),
                backgroundColor: 'rgba(255, 94, 120, 0.2)',
                borderColor: 'rgba(255, 94, 120, 1)',
                borderWidth: 2,
                tension: 0.4,
                yAxisID: 'y1'
            }
        ]
    };

    const config = {
        type: 'line',
        data: chartData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        color: '#b5b5b5',
                        font: {
                            family: "'Poppins', sans-serif",
                            size: 12
                        }
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(30, 10, 60, 0.8)',
                    titleFont: {
                        family: "'Poppins', sans-serif",
                        size: 14
                    },
                    bodyFont: {
                        family: "'Poppins', sans-serif",
                        size: 12
                    },
                    borderColor: 'rgba(255, 255, 255, 0.1)',
                    borderWidth: 1
                }
            },
            scales: {
                x: {
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)',
                        borderColor: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: '#b5b5b5',
                        font: {
                            family: "'Poppins', sans-serif",
                            size: 12
                        }
                    }
                },
                y: {
                    position: 'left',
                    title: {
                        display: true,
                        text: 'Steps',
                        color: 'rgba(83, 144, 217, 1)',
                        font: {
                            family: "'Poppins', sans-serif",
                            size: 12
                        }
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)',
                        borderColor: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: '#b5b5b5',
                        font: {
                            family: "'Poppins', sans-serif",
                            size: 12
                        }
                    }
                },
                y1: {
                    position: 'right',
                    title: {
                        display: true,
                        text: 'Calories',
                        color: 'rgba(255, 94, 120, 1)',
                        font: {
                            family: "'Poppins', sans-serif",
                            size: 12
                        }
                    },
                    grid: {
                        drawOnChartArea: false
                    },
                    ticks: {
                        color: '#b5b5b5',
                        font: {
                            family: "'Poppins', sans-serif",
                            size: 12
                        }
                    }
                }
            }
        }
    };

    new Chart(ctx, config);
}

function initializeControls() {
    // Activity buttons
    document.getElementById('start-activity').addEventListener('click', function() {
        showNotification('Activity started!');
        simulateActivityProgress();
    });

    document.getElementById('pause-activity').addEventListener('click', function() {
        showNotification('Activity paused');
        clearInterval(window.activityInterval);
    });

    document.getElementById('stop-activity').addEventListener('click', function() {
        showNotification('Activity stopped');
        clearInterval(window.activityInterval);
    });

    // Goal input controls
    const incrementButtons = document.querySelectorAll('.increment-btn');
    const decrementButtons = document.querySelectorAll('.decrement-btn');

    incrementButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            const input = document.getElementById(targetId);
            const step = parseFloat(input.step) || 1;
            input.value = (parseFloat(input.value) + step).toFixed(input.step.includes('.') ? 1 : 0);
        });
    });

    decrementButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            const input = document.getElementById(targetId);
            const step = parseFloat(input.step) || 1;
            const minValue = parseFloat(input.min) || 0;
            const newValue = Math.max(parseFloat(input.value) - step, minValue);
            input.value = newValue.toFixed(input.step.includes('.') ? 1 : 0);
        });
    });

    // Save goals button
    document.getElementById('save-goals').addEventListener('click', function() {
        const stepsGoal = parseInt(document.getElementById('steps-goal-input').value);
        const caloriesGoal = parseInt(document.getElementById('calories-goal-input').value);
        const distanceGoal = parseFloat(document.getElementById('distance-goal-input').value);

        // Update displayed goals
        document.getElementById('steps-goal').textContent = stepsGoal.toLocaleString();
        document.getElementById('calories-goal').textContent = caloriesGoal.toLocaleString();
        document.getElementById('distance-goal').textContent = distanceGoal.toLocaleString();

        // Update progress bars
        const stepsValue = parseInt(document.getElementById('steps-value').textContent.replace(/,/g, ''));
        const caloriesValue = parseInt(document.getElementById('calories-value').textContent.replace(/,/g, ''));
        const distanceValue = parseFloat(document.getElementById('distance-value').textContent);

        const stepsProgress = (stepsValue / stepsGoal) * 100;
        const caloriesProgress = (caloriesValue / caloriesGoal) * 100;
        const distanceProgress = (distanceValue / distanceGoal) * 100;

        document.getElementById('steps-progress').style.width = `${Math.min(stepsProgress, 100)}%`;
        document.getElementById('calories-progress').style.width = `${Math.min(caloriesProgress, 100)}%`;
        document.getElementById('distance-progress').style.width = `${Math.min(distanceProgress, 100)}%`;

        showNotification('Goals updated successfully!');
    });
}

function simulateActivityProgress() {
    // Clear any existing interval
    if (window.activityInterval) {
        clearInterval(window.activityInterval);
    }

    // Create a new interval to update metrics every 3 seconds
    window.activityInterval = setInterval(() => {
        // Get current values
        const currentSteps = parseInt(document.getElementById('steps-value').textContent.replace(/,/g, ''));
        const currentCalories = parseInt(document.getElementById('calories-value').textContent.replace(/,/g, ''));
        const currentDistance = parseFloat(document.getElementById('distance-value').textContent);

        // Increment values
        const newSteps = currentSteps + Math.floor(Math.random() * 50) + 30;
        const newCalories = currentCalories + Math.floor(Math.random() * 5) + 3;
        const newDistance = (currentDistance + (Math.random() * 0.05 + 0.02)).toFixed(1);

        // Update display
        document.getElementById('steps-value').textContent = newSteps.toLocaleString();
        document.getElementById('calories-value').textContent = newCalories.toLocaleString();
        document.getElementById('distance-value').textContent = newDistance;

        // Update progress bars
        const stepsGoal = parseInt(document.getElementById('steps-goal').textContent.replace(/,/g, ''));
        const caloriesGoal = parseInt(document.getElementById('calories-goal').textContent.replace(/,/g, ''));
        const distanceGoal = parseFloat(document.getElementById('distance-goal').textContent);

        const stepsProgress = (newSteps / stepsGoal) * 100;
        const caloriesProgress = (newCalories / caloriesGoal) * 100;
        const distanceProgress = (newDistance / distanceGoal) * 100;

        document.getElementById('steps-progress').style.width = `${Math.min(stepsProgress, 100)}%`;
        document.getElementById('calories-progress').style.width = `${Math.min(caloriesProgress, 100)}%`;
        document.getElementById('distance-progress').style.width = `${Math.min(distanceProgress, 100)}%`;

        // Check if goals reached
        if (newSteps >= stepsGoal || newCalories >= caloriesGoal || newDistance >= distanceGoal) {
            if (newSteps >= stepsGoal) showNotification('Congratulations! Steps goal reached! 🎉');
            if (newCalories >= caloriesGoal) showNotification('Congratulations! Calories goal reached! 🔥');
            if (newDistance >= distanceGoal) showNotification('Congratulations! Distance goal reached! 🏆');
        }
    }, 3000);
}

function showNotification(message) {
    // Check if notification container exists
    let notificationContainer = document.querySelector('.notification-container');
    
    // Create container if it doesn't exist
    if (!notificationContainer) {
        notificationContainer = document.createElement('div');
        notificationContainer.className = 'notification-container';
        notificationContainer.style.position = 'fixed';
        notificationContainer.style.top = '20px';
        notificationContainer.style.right = '20px';
        notificationContainer.style.zIndex = '1000';
        document.body.appendChild(notificationContainer);
    }
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.style.backgroundColor = 'var(--card-background)';
    notification.style.color = 'var(--text-color)';
    notification.style.padding = '15px 20px';
    notification.style.borderRadius = '8px';
    notification.style.marginBottom = '10px';
    notification.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.3)';
    notification.style.borderLeft = '4px solid var(--secondary-color)';
    notification.style.transform = 'translateX(100%)';
    notification.style.opacity = '0';
    notification.style.transition = 'all 0.3s ease';
    notification.textContent = message;
    
    // Add to container
    notificationContainer.appendChild(notification);
    
    // Trigger animation
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
        notification.style.opacity = '1';
    }, 10);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        notification.style.opacity = '0';
        
        // Remove from DOM after animation
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}