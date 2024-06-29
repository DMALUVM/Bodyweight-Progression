function showCalculator(type) {
    document.getElementById('pushUpContainer').style.display = 'none';
    document.getElementById('pullUpContainer').style.display = 'none';
    document.getElementById('airSquatContainer').style.display = 'none';
    document.getElementById('navPushUp').classList.remove('active');
    document.getElementById('navPullUp').classList.remove('active');
    document.getElementById('navAirSquat').classList.remove('active');

    document.getElementById(`${type}Container`).style.display = 'block';
    document.getElementById(`nav${type.charAt(0).toUpperCase() + type.slice(1)}`).classList.add('active');
}

function calculateRoutine(type) {
    const currentMax = parseInt(document.getElementById(`currentMax${capitalize(type)}`).value);
    const goal = parseInt(document.getElementById(`${type}Goal`).value);
    const useWeightVest = document.getElementById(`weightVest${capitalize(type)}`).checked;

    const routineElement = document.getElementById(`workoutRoutine${capitalize(type)}`);
    const estimatedMaxElement = document.getElementById(`estimatedMax${capitalize(type)}`);
    const estimatedTimeElement = document.getElementById(`estimatedTime${capitalize(type)}`);

    if (isNaN(currentMax) || currentMax <= 0) {
        alert("Please enter a valid number for the current max reps (without weight vest).");
        return;
    }

    const adjustedCurrentMax = useWeightVest ? adjustForWeightVest(currentMax) : currentMax;
    const estimatedNewMax = calculateEstimatedMax(adjustedCurrentMax);
    const routine = generateRoutine(adjustedCurrentMax, estimatedNewMax, type, useWeightVest);
    
    estimatedMaxElement.innerHTML = `Estimated new max after 4 weeks: ${estimatedNewMax} reps ${useWeightVest ? 'with weight vest' : 'without weight vest'}`;
    
    if (!isNaN(goal) && goal > currentMax) {
        const weeksToGoal = calculateWeeksToGoal(adjustedCurrentMax, goal);
        estimatedTimeElement.innerHTML = `Estimated time to reach goal of ${goal} reps: ${weeksToGoal} weeks`;
    } else {
        estimatedTimeElement.innerHTML = '';
    }
    
    routineElement.innerHTML = routine;
}

function generateRoutine(currentMax, targetMax, type, useWeightVest) {
    let routine = `<h3>4-Week ${capitalize(type)} Progression Plan</h3>`;
    if (useWeightVest) {
        routine += "<p><strong>Using 20 lb Weight Vest</strong></p>";
        routine += "<p>Note: The current max and goal are based on reps without the weight vest. The routine adjusts for the added difficulty.</p>";
    }
    routine += "<ul>";

    const weeklyIncrement = (targetMax - currentMax) / 4;

    for (let week = 1; week <= 4; week++) {
        routine += `<li>Week ${week}<ul>`;
        const weeklyMax = Math.round(currentMax + (weeklyIncrement * (week - 1)));

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

function adjustForWeightVest(currentMax) {
    return Math.round(currentMax * 0.7); // Assume 30% reduction in reps with weight vest
}

function calculateEstimatedMax(currentMax) {
    const weeklyGainPercentage = 0.05; // 5% weekly gain
    return Math.round(currentMax * Math.pow(1 + weeklyGainPercentage, 4));
}

function calculateWeeksToGoal(currentMax, goal) {
    const weeklyGainPercentage = 0.05; // 5% weekly gain
    return Math.ceil(Math.log(goal / currentMax) / Math.log(1 + weeklyGainPercentage));
}

function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// Initialize the page with the Push-Up calculator visible
document.addEventListener('DOMContentLoaded', function() {
    showCalculator('pushUp');
});
