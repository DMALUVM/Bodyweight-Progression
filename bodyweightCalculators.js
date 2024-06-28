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
    let currentMax, goal;
    let routineElement, estimatedMaxElement, estimatedTimeElement;
    if (type === 'pushUp') {
        currentMax = parseInt(document.getElementById("currentMaxPushUp").value);
        goal = parseInt(document.getElementById("pushUpGoal").value);
        routineElement = document.getElementById("workoutRoutinePushUp");
        estimatedMaxElement = document.getElementById("estimatedMaxPushUp");
        estimatedTimeElement = document.getElementById("estimatedTimePushUp");
    } else if (type === 'pullUp') {
        currentMax = parseInt(document.getElementById("currentMaxPullUp").value);
        goal = parseInt(document.getElementById("pullUpGoal").value);
        routineElement = document.getElementById("workoutRoutinePullUp");
        estimatedMaxElement = document.getElementById("estimatedMaxPullUp");
        estimatedTimeElement = document.getElementById("estimatedTimePullUp");
    } else if (type === 'airSquat') {
        currentMax = parseInt(document.getElementById("currentMaxAirSquat").value);
        goal = parseInt(document.getElementById("airSquatGoal").value);
        routineElement = document.getElementById("workoutRoutineAirSquat");
        estimatedMaxElement = document.getElementById("estimatedMaxAirSquat");
        estimatedTimeElement = document.getElementById("estimatedTimeAirSquat");
    }

    if (isNaN(currentMax) || currentMax <= 0) {
        alert("Please enter a valid number for the current max reps.");
        return;
    }

    let estimatedNewMax = calculateEstimatedMax(currentMax);
    let routine = generateRoutine(currentMax, estimatedNewMax, type);
    
    estimatedMaxElement.innerHTML = `Estimated new max after 4 weeks: ${estimatedNewMax} reps`;
    
    if (!isNaN(goal) && goal > currentMax) {
        let weeksToGoal = calculateWeeksToGoal(currentMax, goal);
        estimatedTimeElement.innerHTML = `Estimated time to reach goal of ${goal} reps: ${weeksToGoal} weeks`;
    } else {
        estimatedTimeElement.innerHTML = '';
    }
    
    routineElement.innerHTML = routine;
}

function generateRoutine(currentMax, targetMax, type) {
    let routine = `<h3>4-Week ${type.charAt(0).toUpperCase() + type.slice(1)} Progression Plan</h3>`;
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

function calculateEstimatedMax(currentMax) {
    const weeklyGainPercentage = 0.05; // 5% weekly gain
    return Math.round(currentMax * Math.pow(1 + weeklyGainPercentage, 4));
}

function calculateWeeksToGoal(currentMax, goal) {
    const weeklyGainPercentage = 0.05; // 5% weekly gain
    const weeksToGoal = Math.ceil(Math.log(goal / currentMax) / Math.log(1 + weeklyGainPercentage));
    return weeksToGoal;
}
