let editRowIndex = null;

document.getElementById('myForm').addEventListener('submit', function(event){
  event.preventDefault();

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;
  const contactNo = document.getElementById('contactNo').value;
  const gender = document.querySelector('input[name="gender"]:checked');
  const country = document.getElementById('country');
  const state = document.getElementById('state');
  const city = document.getElementById('city');
  const image = document.getElementById('image').files[0];
  
  const errorMessageName=document.getElementById('errorMessageName');
  const errorMessageEmail=document.getElementById('errorMessageEmail');
  const errorMessageContactNo=document.getElementById('errorMessageContactNo');
  const errorMessagePassword=document.getElementById('errorMessagePassword');
  const errorMessageConfirmPassword=document.getElementById('errorMessageConfirmPassword');
  const errorMessageGender=document.getElementById('errorMessageGender');
  const errorMessageCountry=document.getElementById('errorMessageCountry');
  const errorMessageState=document.getElementById('errorMessageState');
  const errorMessageCity=document.getElementById('errorMessageCity');
  const errorMessageImage=document.getElementById('errorMessageImage');

  const nameCheck=/^[a-zA-Z]+$/;
  const emailCheck=/^[a-zA-Z0-9._]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,}$/;
  const passwordCheck=/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
  const contactNoCheck=/^[0-9]{10}$/;

  errorMessageName.innerHTML = '';
  errorMessageEmail.innerHTML = '';
  errorMessagePassword.innerHTML = '';
  errorMessageConfirmPassword.innerHTML = '';
  errorMessageContactNo.innerHTML = '';
  errorMessageGender.innerHTML = '';
  errorMessageCountry.innerHTML = '';
  errorMessageState.innerHTML = '';
  errorMessageCity.innerHTML = '';
  errorMessageImage.innerHTML = '';
  
  let isValid = true;
 
 if(!nameCheck.test(name)){
    errorMessageName.innerHTML = "Enter valid name!<br>";
    isValid = false;
  }  
  if(!emailCheck.test(email)){
    errorMessageEmail.innerHTML = "Enter valid email!<br>";
    isValid = false;
  }
  if(!contactNoCheck.test(contactNo)){
   errorMessageContactNo.innerHTML = "Enter valid number!<br> (Phone number must be of 10 digits)";
   isValid = false;
  }
   
  if(!passwordCheck.test(password)){
    errorMessagePassword.innerHTML = "Enter valid password! <br>(1 uppercase &1 lowercase letter, 1 digit, <br>a special character and min. length of 8 )<br>";
    isValid = false;
  }
  if(confirmPassword!=password){
    errorMessageConfirmPassword.innerHTML = "Password not matched!<br>";
    isValid = false;
  }
  if(!gender){
    errorMessageGender.innerHTML = "Select your gender!<br>";
    isValid = false;
  }
  
  if(country.value == "" ){
    errorMessageCountry.innerHTML = "Select your country!<br>";
    isValid = false; 
  }
  
  if(state.value==""){
    errorMessageState.innerHTML = "Select your state!<br>";
    isValid = false;
  }
  
  if(city.value==""){
    errorMessageCity.innerHTML = "Select your city!<br>";
    isValid = false;
  }
  if(!image){
    errorMessageImage.innerHTML = "Image not selected !<br>";
    isValid = false;
  }
  if (isValid){
    document.getElementById('tableShow').classList.remove('tableHide');
    const reader = new FileReader();
    reader.onload = function(e){
      if(editRowIndex === null){
      displayData(name,email,password,contactNo,gender.value,country.value,state.value,city.value,e.target.result);
      clearForm();
      }
      else{
      updateTableData(name,email,password,contactNo,gender.value,country.value,state.value,city.value,e.target.result,editRowIndex);
      editRowIndex = null;
      clearForm();
      }
    };
    reader.readAsDataURL(image); 
    document.getElementById('imgPreviewShow').classList.add('imgPreviewHide');    
  }
});

function clearForm(){
  document.getElementById('myForm').reset();
}

function stateSelection(){
  const country = document.getElementById('country').value;
  const state = document.getElementById('state');
  const stateShow = document.getElementById('stateShow');

  state.innerHTML = '<option value="">Select your state</option>';
  

  var statesInCountry = {
    India: [ 'Haryana','Punjab','Rajasthan'],
    America: [ 'Florida','California','New York'],
    Canada: ['Ontario','British Columbia','Alberta']
  };
  
  if(statesInCountry[country]){
    statesInCountry[country].forEach(function(stateAdd){
      var option= document.createElement('option');
      option.value= stateAdd;
      option.textContent= stateAdd;
      state.appendChild(option);
    });
    stateShow.classList.remove('stateHide');
  }
  else{
    stateShow.classList.add('stateHide');
    document.getElementById('cityShow').classList.add('cityHide');
  }
}
function citySelection(){
  const state= document.getElementById('state').value;
  const city= document.getElementById('city');
  const cityShow=document.getElementById('cityShow');

  city.innerHTML = '<option value=""> Select Your City </option>' ;

  var cityOption={
        California: ['Los Angeles', 'San Francisco', 'San Diego'],
        Florida: ['Miami', 'Orlando', 'Tampa'],
        'New York': ['New York City', 'Buffalo', 'Rochester'],
        
        Alberta: ['Calgary', 'Edmonton', 'Red Deer'],
        'British Columbia': ['Vancouver', 'Victoria', 'Kelowna'],
        Ontario: ['Toronto', 'Ottawa', 'Hamilton'],
        
        Haryana: ['Karnal', 'Kaithal', 'Kurukshetra','Panipat'],
        Punjab: ['Amritsar', 'Ludhiana', 'Bathinda'],
        Rajasthan: ['Jaipur', 'Jodhpur', 'Jhunjunu']
  }
  
  if(cityOption[state]){
    cityOption[state].forEach(function(cityAdd){
      var option= document.createElement('option');
      option.value=cityAdd;
      option.textContent=cityAdd;
      city.appendChild(option);
    });
    cityShow.classList.remove('cityHide');

  }
  else{
    cityShow.classList.add('cityHide');
  }

}
function previewImage(){
  var image= document.getElementById('image').files[0];
  var imgPreview= document.getElementById('imgPreview');
  var imgPreviewShow= document.getElementById('imgPreviewShow');

  if(image){
    var reader = new FileReader();
    reader.onload = function(e){
      imgPreview.src= e.target.result;
      imgPreviewShow.classList.remove('imgPreviewHide');
    };
    reader.readAsDataURL(image);
  }
  else{
    imgPreviewShow.classList.add('imgPreviewHide');
  }
}

function displayData(name,email,password,contactNo,gender,country,state,city,imageSrc){
    
  const tableBody = document.getElementById('tableBody');

  const newRow = tableBody.insertRow();
  const nameCell = newRow.insertCell(0);
  const emailCell = newRow.insertCell(1);
  const passwordCell = newRow.insertCell(2);
  const contactNoCell = newRow.insertCell(3);
  const genderCell = newRow.insertCell(4);
  const countryCell = newRow.insertCell(5);
  const stateCell = newRow.insertCell(6);
  const cityCell = newRow.insertCell(7);
  const imageCell = newRow.insertCell(8);
  const buttonCell = newRow.insertCell(9);


  nameCell.textContent = name;
  emailCell.textContent = email;
  passwordCell.textContent = password;
  contactNoCell.textContent = contactNo;
  genderCell.textContent = gender;
  countryCell.textContent = country;
  stateCell.textContent = state;
  cityCell.textContent = city;

  const img = document.createElement('img');
  img.src = imageSrc;
  imageCell.appendChild(img);
 
  

  const editButton = document.createElement('button');
  editButton.textContent = 'Edit';
  editButton.classList.add('button','edit-button');
  editButton.addEventListener('click',() => editRow(newRow));

  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.classList.add('button','delete-button');
  deleteButton.addEventListener('click', () => deleteRow(newRow));

  buttonCell.appendChild(editButton);
  buttonCell.appendChild(deleteButton);
}
function editRow(row){
  const name= row.cells[0].textContent;
  const email = row.cells[1].textContent;
  const password = row.cells[2].textContent;
  const contactNo = row.cells[3].textContent;
  const gender = row.cells[4].textContent;
  const imgSrc = row.cells[8].querySelector('img').src;

  document.getElementById('name').value = name;
  document.getElementById('email').value = email;
  document.getElementById('password').value = password;
  document.getElementById('contactNo').value = contactNo;
  document.querySelector(`input[name="gender"][value="${gender}"]`).checked = true;

  
  const file = base64ToFile(imgSrc, 'image.png');

  const dataTransfer = new DataTransfer();
  dataTransfer.items.add(file);
  document.getElementById('image').files = dataTransfer.files;

  document.getElementById('imgPreview').src= row.cells[8].querySelector('img').src;
  document.getElementById('imgPreviewShow').classList.remove('imgPreviewHide');

  editCountryData(row);
    
  editRowIndex = row.rowIndex-1;
}

function editCountryData(row) {
  const country = row.cells[5].textContent;
  const state = row.cells[6].textContent;
  const city = row.cells[7].textContent;

  document.getElementById('country').value = country;
  stateSelection(); 
  document.getElementById('state').value = state;
  citySelection(); 
  document.getElementById('city').value = city;
}
function base64ToFile(base64String, filename) {

  const byteString = atob(base64String.split(',')[1]);
  const arrayBuffer = new ArrayBuffer(byteString.length);
  const uint8Array = new Uint8Array(arrayBuffer);

  for (let i = 0; i < byteString.length; i++) {
    uint8Array[i] = byteString.charCodeAt(i);
  }
  const blob = new Blob([uint8Array], { type: 'image/png' });
  const file = new File([blob], filename, { type: 'image/png' });

  return file;
}
function updateTableData(name,email,password,contactNo,gender,country,state,city,imageSrc,rowIndex){
  const tableBody = document.getElementById('tableBody');
  const row = tableBody.rows[rowIndex];

  row.cells[0].textContent = name;
  row.cells[1].textContent = email;
  row.cells[2].textContent = password;
  row.cells[3].textContent = contactNo;
  row.cells[4].textContent = gender;
  row.cells[5].textContent = country;
  row.cells[6].textContent = state;
  row.cells[7].textContent = city;
  const img = row.cells[8].querySelector('img');
  img.src = imageSrc;
}  
function deleteRow(row) { 
  const tableBody = row.parentNode;
  const rowIndex = row.rowIndex;
  tableBody.removeChild(row);
    
  if (editRowIndex === rowIndex - 1) {
       editRowIndex = null; 
  } 
  else if (editRowIndex > rowIndex - 1) {
      editRowIndex -= 1; 
  }
    
  if(tableBody.rows.length == 0){
    document.getElementById('tableShow').classList.add('tableHide');
  }
}






















