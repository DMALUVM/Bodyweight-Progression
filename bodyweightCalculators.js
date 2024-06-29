function showCalculator(type) {
    document.getElementById('pushUpContainer').style.display = 'none';
    document.getElementById('pullUpContainer').style.display = 'none';
    document.getElementById('airSquatContainer').style.display = 'none';
    document.getElementById('navPushUp').classList.remove('active');
    document.getElementById('navPullUp').classList.remove('active');
    document.getElementById('navAirSquat').classList.remove('active');

    document.getElementById(`${type}Container`).style.display = 'block';
    document.getElementById(`nav${capitalize(type)}`).classList.add('active');
}

function calculateRoutine(type) {
    const currentMax = parseInt(document.getElementById(`currentMax${capitalize(type)}`).value);
    const goal = parseInt(document.getElementById(`${type}Goal`).value);
    const useWeightVest = document.getElementById(`weightVest${capitalize(type)}`).checked;
    const variation = document.getElementById(`${type}Variation`).value;

    const routineElement = document.getElementById(`workoutRoutine${capitalize(type)}`);
    const estimatedMaxElement = document.getElementById(`estimatedMax${capitalize(type)}`);
    const estimatedTimeElement = document.getElementById(`estimatedTime${capitalize(type)}`);

    if (isNaN(currentMax) || currentMax <= 0) {
        alert("Please enter a valid number for the current max reps (without weight vest).");
        return;
    }

    const adjustedCurrentMax = useWeightVest ? adjustForWeightVest(currentMax, type) : currentMax;
    const estimatedNewMax = calculateEstimatedMax(adjustedCurrentMax, type);
    const routine = generateRoutine(adjustedCurrentMax, estimatedNewMax, type, useWeightVest, variation);
    
    estimatedMaxElement.innerHTML = `Estimated new max after 6 weeks: ${estimatedNewMax} reps ${useWeightVest ? 'with weight vest' : 'without weight vest'}`;
    
    if (!isNaN(goal) && goal > currentMax) {
        const weeksToGoal = calculateWeeksToGoal(adjustedCurrentMax, goal, type);
        estimatedTimeElement.innerHTML = `Estimated time to reach goal of ${goal} reps: ${weeksToGoal} weeks`;
    } else {
        estimatedTimeElement.innerHTML = '';
    }
    
    routineElement.innerHTML = routine;
}

function generateRoutine(currentMax, targetMax, type, useWeightVest, variation) {
    let routine = `<h3>6-Week ${capitalize(type)} Progression Plan</h3>`;
    routine += `<p><strong>Exercise: ${getExerciseName(type, variation)}</strong></p>`;
    if (useWeightVest) {
        routine += "<p><strong>Using 20 lb Weight Vest</strong></p>";
    }
    routine += "<ul>";

    const weeklyIncrement = (targetMax - currentMax) / 6;

    for (let week = 1; week <= 6; week++) {
        routine += `<li>Week ${week}<ul>`;
        const weeklyMax = Math.round(currentMax + (weeklyIncrement * (week - 1)));

        if (week === 4) {
            routine += `<li>Deload Week: 3 sets of ${Math.round(weeklyMax * 0.6)} ${type}s</li>`;
        } else {
            for (let day = 1; day <= 3; day++) {
                const { sets, reps } = calculateSetsAndReps(weeklyMax, type, day);
                routine += `<li>Day ${day}: ${sets} sets of ${reps} ${type}s</li>`;
            }
        }
        routine += "</ul></li>";
    }
    routine += "</ul>";
    routine += generateWarmUpCoolDown(type);
    return routine;
}

function calculateSetsAndReps(weeklyMax, type, day) {
    let sets, reps;
    if (type === 'pullUp') {
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
    } else {
        if (day === 1) {
            sets = 4;
            reps = Math.round(weeklyMax * 0.7);
        } else if (day === 2) {
            sets = 3;
            reps = Math.round(weeklyMax * 0.8);
        } else {
            sets = 3;
            reps = Math.round(weeklyMax * 0.9);
        }
    }
    return { sets, reps };
}

function adjustForWeightVest(currentMax, type) {
    const reductionFactor = type === 'pullUp' ? 0.7 : 0.8;
    return Math.round(currentMax * reductionFactor);
}

function calculateEstimatedMax(currentMax, type) {
    const weeklyGainPercentage = type === 'pullUp' ? 0.02 : 0.03;
    return Math.round(currentMax * Math.pow(1 + weeklyGainPercentage, 6));
}

function calculateWeeksToGoal(currentMax, goal, type) {
    const weeklyGainPercentage = type === 'pullUp' ? 0.02 : 0.03;
    return Math.ceil(Math.log(goal / currentMax) / Math.log(1 + weeklyGainPercentage));
}

function getExerciseName(type, variation) {
    const exercises = {
        pushUp: {
            standard: 'Standard Push-Up',
            diamond: 'Diamond Push-Up',
            wide: 'Wide Push-Up'
        },
        pullUp: {
            standard: 'Standard Pull-Up',
            chinUp: 'Chin-Up',
            neutral: 'Neutral Grip Pull-Up'
        },
        airSquat: {
            standard: 'Standard Air Squat',
            jumpSquat: 'Jump Squat',
            bulgarianSplit: 'Bulgarian Split Squat'
        }
    };
    return exercises[type][variation];
}

function generateWarmUpCoolDown(type) {
    let warmUp = "<h4>Warm-Up (5-10 minutes)</h4><ul>";
    warmUp += "<li>Light cardio (jogging in place, jumping jacks)</li>";
    warmUp += "<li>Arm circles and shoulder rolls</li>";
    warmUp += "<li>Body-weight squats</li>";
    warmUp += `<li>5-10 ${type}s at 50% effort</li></ul>`;

    let coolDown = "<h4>Cool-Down (5-10 minutes)</h4><ul>";
    coolDown += "<li>Light stretching for major muscle groups</li>";
    coolDown += "<li>Deep breathing exercises</li></ul>";

    return warmUp + coolDown;
}

function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// Initialize the page with the Push-Up calculator visible
document.addEventListener('DOMContentLoaded', function() {
    showCalculator('pushUp');
});
