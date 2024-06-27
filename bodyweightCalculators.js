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
    let currentMax;
    let routineElement, estimatedMaxElement;

    if (type === 'pushUp') {
        currentMax = parseInt(document.getElementById("currentMaxPushUp").value);
        routineElement = document.getElementById("workoutRoutinePushUp");
        estimatedMaxElement = document.getElementById("estimatedMaxPushUp");
    } else if (type === 'pullUp') {
        currentMax = parseInt(document.getElementById("currentMaxPullUp").value);
        routineElement = document.getElementById("workoutRoutinePullUp");
        estimatedMaxElement = document.getElementById("estimatedMaxPullUp");
    } else if (type === 'airSquat') {
        currentMax = parseInt(document.getElementById("currentMaxAirSquat").value);
        routineElement = document.getElementById("workoutRoutineAirSquat");
        estimatedMaxElement = document.getElementById("estimatedMaxAirSquat");
    }

    if (isNaN(currentMax) || currentMax <= 0) {
        alert("Please enter a valid number for the current max reps.");
        return;
    }

    let routine = generateRoutine(currentMax, type);

    let estimatedNewMax = Math.round(currentMax * 1.2); // Example increment, adjust as needed

    estimatedMaxElement.innerHTML = `Estimated new max after 4 weeks: ${estimatedNewMax} reps`;
    routineElement.innerHTML = routine;
}

function generateRoutine(currentMax, type) {
    let routine = `<h3>4-Week ${type.charAt(0).toUpperCase() + type.slice(1)} Progression Plan</h3>`;
    routine += "<ul>";
    for (let week = 1; week <= 4; week++) {
        routine += `<li>Week ${week}<ul>`;
        for (let day = 1; day <= 3; day++) {  // Example: 3 workout days per week
            let sets = 3;
            let reps = Math.round((currentMax / 2) * (1 + (week - 1) / 4)); // Example progression
            routine += `<li>Day ${day}: ${sets} sets of ${reps} ${type}s</li>`;
        }
        routine += "</ul></li>";
    }
    routine += "</ul>";
    return routine;
}
