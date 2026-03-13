/* add code here  */

// highlightable fields
let highlightableFields = document.querySelectorAll(".hilightable");
highlightableFields.forEach(function(field) {
    field.addEventListener("click", function() {
        highlightableFields.forEach(function(f) {
            f.classList.remove("highlight");
        });
        field.classList.add("highlight");
    });
});

// error fields
document.getElementById("mainForm").addEventListener("submit", function(event) {
    let requiredFields = ["title", "description", "year"];
    let formIsValid = true;
    
    let firstEmptyField = null;
                
    requiredFields.forEach(function(fieldId) {
        let field = document.getElementById(fieldId);
        if (field.value.trim() === "") {
            field.classList.add("error");
            formIsValid = false;
            if (!firstEmptyField) {
                firstEmptyField = field;
            }
        } else {
            field.classList.remove("error");
        }
    });
    
    if (!formIsValid) {
        event.preventDefault();
    }
});