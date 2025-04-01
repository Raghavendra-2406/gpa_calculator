// Function to create input fields for subjects
function createSubjectInputs() {
    const subjectCount = parseInt(document.getElementById('subjects').value);
    const subjectFields = document.getElementById('subject-fields');
    subjectFields.innerHTML = ''; // Clear existing inputs

    if (!subjectCount || subjectCount < 1) {
        alert('Please enter a valid number of subjects.');
        return;
    }

    for (let i = 1; i <= subjectCount; i++) {
        const subjectDiv = document.createElement('div');
        subjectDiv.innerHTML = `
            <label>Subject ${i}:</label>
            <input type="number" id="grade-${i}" placeholder="Grade Point (0-10)" min="0" max="10" step="0.01" required>
            <input type="number" id="credit-${i}" placeholder="Credits" min="1" step="0.5" required>
        `;
        subjectFields.appendChild(subjectDiv);
    }
}

// Function to calculate SGPA
function calculateSGPA() {
    const subjectCount = parseInt(document.getElementById('subjects').value);
    if (!subjectCount || subjectCount < 1) {
        alert('Please generate inputs for subjects first.');
        return;
    }

    let totalCredits = 0;
    let weightedSum = 0;

    for (let i = 1; i <= subjectCount; i++) {
        const gradePoint = parseFloat(document.getElementById(`grade-${i}`).value);
        const credits = parseFloat(document.getElementById(`credit-${i}`).value);

        if (isNaN(credits) || isNaN(gradePoint) || credits <= 0 || gradePoint < 0 || gradePoint > 10) {
            alert(`Invalid input for Subject ${i}. Please check your entries.`);
            return;
        }

        totalCredits += credits;
        weightedSum += credits * gradePoint;
    }

    const sgpa = (weightedSum / totalCredits).toFixed(2);
    document.getElementById('sgpa-result').textContent = `Your SGPA is: ${sgpa}`;
}

// Function to calculate CGPA
function calculateCGPA() {
    const sgpaValues = document.getElementById('semesters').value.split(',').map(value => parseFloat(value.trim()));
    if (sgpaValues.length === 0 || sgpaValues.some(isNaN)) {
        alert('Please enter valid SGPA values separated by commas.');
        return;
    }

    const cgpa = (sgpaValues.reduce((sum, sgpa) => sum + sgpa, 0) / sgpaValues.length).toFixed(2);
    document.getElementById('cgpa-result').textContent = `Your CGPA is: ${cgpa}`;
}
