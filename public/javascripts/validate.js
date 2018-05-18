var comp_name = document.forms['formu']['comp_name'];
var comp_email = document.forms['formu']['comp_email'];
var comp_pass = document.forms['formu']['comp_pass'];
var reap_pass = document.forms['formu']['reap_pass'];
var terms_conditions = document.forms['formu']['terms_conditions'];

var error_comp_name = document.getElementById('error_comp_name');
var error_comp_email = document.getElementById('error_comp_email');
var error_comp_pass = document.getElementById('error_comp_pass');
var error_repp_pass = document.getElementById('error_repp_pass');
var error_terms_conditions = document.getElementById('error_terms_conditions');

comp_name.addEventListener('blur', comp_nameVerify, true);
comp_email.addEventListener('blur', comp_emailVerify, true);
comp_pass.addEventListener('blur', comp_passVerify, true);
reap_pass.addEventListener('blur', reap_passVerify, true);
terms_conditions.addEventListener('blur', terms_conditionsVerify, true);


function Validate(){
	if(comp_name.value == ""){
		comp_name.style.border = '1px solid #ff4d4d';
		error_comp_name.textContent = 'Escriba el nombre de su compañía.';
		comp_name.focus();
		return false;
	}
	if(comp_email.value == ""){
		comp_email.style.border = '1px solid #ff4d4d';
		error_comp_email.textContent = 'Escriba un email de contacto.';
		comp_email.focus();
		return false;
	}
	if(comp_pass.value == ""){
		comp_pass.style.border = '1px solid #ff4d4d';
		error_comp_pass.textContent = 'Escriba una contraseña.';
		comp_pass.focus();
		return false;
	}
	if(reap_pass.value == ""){
		reap_pass.style.border = '1px solid #ff4d4d';
		error_repp_pass.textContent = 'Repita su contraseña.';
		reap_pass.focus();
		return false;
	}
	if(comp_pass.value != comp_repp_pass.value){
		comp_pass.style.border = '1px solid #ff4d4d';
		comp_repp_pass.style.border = '1px solid #ff4d4d';
		error_repp_pass.innerHTML = 'Las contraseñas no coinciden';
		return false;
	}
	if(formu.terms_conditions.checked == false){
		error_terms_conditions.textContent = 'Por favor, acepte los términos y condiciones.'
		terms_conditions.focus();
		return false;
	}
}

function comp_nameVerify(){
	if(comp_nameVerify.value != ""){
		comp_name.style.border = '1px solid #cccccc';
		error_comp_name.innerHTML = "";
		return true;
	}
}
function comp_emailVerify(){
	if(comp_emailVerify.value != ""){
		comp_email.style.border = '1px solid #cccccc';
		error_comp_email.innerHTML = "";
		return true;
	}
}
function comp_passVerify(){
	if(comp_passVerify.value != ""){
		comp_pass.style.border = '1px solid #cccccc';
		error_comp_pass.innerHTML = "";
		return true;
	}
}
function reap_passVerify(){
	if(reap_pass.value == comp_pass.value){
		comp_pass.style.border = '1px solid #cccccc';
		reap_pass.style.border = '1px solid #cccccc';
		error_repp_pass.innerHTML = "";
		reap_pass.innerHTML = "";
		comp_pass.innerHTML = "";
		return true;
	}
}
function terms_conditionsVerify(){
	if(terms_conditionsVerify.value != ""){
		error_terms_conditions.innerHTML = "";
		return true;
	}
}