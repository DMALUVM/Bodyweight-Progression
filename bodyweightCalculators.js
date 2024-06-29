function showCalculator(type) {
    document.getElementById('pushUpContainer').style.display = 'none';
    document.getElementById('pullUpContainer').style.display = 'none';
    document.getElementById('airSquatContainer').style.display = 'none';
    document.getElementById('navPushUp').classList.remove('active');
    document.getElementById('navPullUp').classList.remove('active');
    document.getElementById('navAirSquat').classList.remove('active');
    if (type === 'pushUp') {
        document.getElementById('pushUpContainer').style.display = 'block';
        document.getElementById('navPushUp').classList.add('active');
    } else if (type === 'pullUp') {
        document.getElementById('pullUpContainer').style.display = 'block';
        document.getElementById('navPullUp').classList.add('active');
    } else if (type === 'airSquat') {
        document.getElementById('airSquatContainer').style.display = 'block';
        document.getElementById('navAirSquat').classList.add('active');
    }
}

function calculateRoutine(type) {
    let currentMax, goal, useWeightVest;
    let routineElement, estimatedMaxElement, estimatedTimeElement;
    if (type === 'pushUp') {
        currentMax = parseInt(document.getElementById("currentMaxPushUp").value);
        goal = parseInt(document.getElementById("pushUpGoal").value);
        useWeightVest = document.getElementById("weightVestPushUp").checked;
        routineElement = document.getElementById("workoutRoutinePushUp");
        estimatedMaxElement = document.getElementById("estimatedMaxPushUp");
        estimatedTimeElement = document.getElementById("estimatedTimePushUp");
    } else if (type === 'pullUp') {
        currentMax = parseInt(document.getElementById("currentMaxPullUp").value);
        goal = parseInt(document.getElementById("pullUpGoal").value);
        useWeightVest = document.getElementById("weightVestPullUp").checked;
        routineElement = document.getElementById("workoutRoutinePullUp");
        estimatedMaxElement = document.getElementById("estimatedMaxPullUp");
        estimatedTimeElement = document.getElementById("estimatedTimePullUp");
    } else if (type === 'airSquat') {
        currentMax = parseInt(document.getElementById("currentMaxAirSquat").value);
        goal = parseInt(document.getElementById("airSquatGoal").value);
        useWeightVest = document.getElementById("weightVestAirSquat").checked;
        routineElement = document.getElementById("workoutRoutineAirSquat");
        estimatedMaxElement = document.getElementById("estimatedMaxAirSquat");
        estimatedTimeElement = document.getElementById("estimatedTimeAirSquat");
    }

    if (isNaN(currentMax) || currentMax <= 0) {
        alert("Please enter a valid number for the current max reps.");
        return;
    }

    let estimatedNewMax = calculateEstimatedMax(currentMax, useWeightVest);
    let routine = generateRoutine(currentMax, estimatedNewMax, type, useWeightVest);
    
    estimatedMaxElement.innerHTML = `Estimated new max after 4 weeks: ${estimatedNewMax} reps`;
    
    if (!isNaN(goal) && goal > currentMax) {
        let weeksToGoal = calculateWeeksToGoal(currentMax, goal, useWeightVest);
        estimatedTimeElement.innerHTML = `Estimated time to reach goal of ${goal} reps: ${weeksToGoal} weeks`;
    } else {
        estimatedTimeElement.innerHTML = '';
    }
    
    routineElement.innerHTML = routine;
}

function generateRoutine(currentMax, targetMax, type, useWeightVest) {
    let routine = `<h3>4-Week ${type.charAt(0).toUpperCase() + type.slice(1)} Progression Plan</h3>`;
    if (useWeightVest) {
        routine += "<p><strong>Using 20 lb Weight Vest</strong></p>";
    }
    routine += "<ul>";

    const weeklyIncrement = (targetMax - currentMax) / 4;

    for (let week = 1; week <= 4; week++) {
        routine += `<li>Week ${week}<ul>`;
        let weeklyMax = Math.round(currentMax + (weeklyIncrement * (week - 1)));

        for (let day = 1; day <= 3; day++) {
            let sets, reps;
            if (day === 1) {
                sets = 5;
                reps = Math.round(weeklyMax * 0.6);
            } else if (day === 2) {
                sets = 4;
                reps = Math.round(weeklyMax * 0.7);
            } else {
                sets = 3;
                reps = Math.round(weeklyMax * 0.8);
            }

            routine += `<li>Day ${day}: ${sets} sets of ${reps} ${type}s</li>`;
        }
        routine += "</ul></li>";
    }
    routine += "</ul>";
    return routine;
}

function calculateEstimatedMax(currentMax, useWeightVest) {
    let weeklyGainPercentage = 0.05; // 5% weekly gain
    if (useWeightVest) {
        weeklyGainPercentage = 0.07; // 7% weekly gain with weight vest
    }
    return Math.round(currentMax * Math.pow(1 + weeklyGainPercentage, 4));
}

function calculateWeeksToGoal(currentMax, goal, useWeightVest) {
    let weeklyGainPercentage = 0.05; // 5% weekly gain
    if (useWeightVest) {
        weeklyGainPercentage = 0.07; // 7% weekly gain with weight vest
    }
    const weeksToGoal = Math.ceil(Math.log(goal / currentMax) / Math.log(1 + weeklyGainPercentage));
    return weeksToGoal;
}

// Initialize the page with the Push-Up calculator visible
document.addEventListener('DOMContentLoaded', function() {
    showCalculator('pushUp');
});
// Initialize the page with the Push-Up calculator visible
document.addEventListener('DOMContentLoaded', function() {
    showCalculator('pushUp');
});
