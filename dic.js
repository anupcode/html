let input=document.querySelector('#input');
let searchbtn=document.querySelector('#search');
let api='faaa3daf-6b6c-4853-9d25-a2313001f270';
let notfound=document.querySelector('.not_found');
let defbox=document.querySelector('.def')
let audioBox=document.querySelector('.audio');
let loading=document.querySelector('.Loading')

searchbtn.addEventListener('click',function(e) {
	e.preventDefault();

	// clear data

	audioBox.innerHTML='';
	notfound.innerText='';
	defbox.innerText='';
	
	// get input data

	let word=input.value;

	// cal Api get data

	if (word==="") {
		alert('word');
		return;
	}

	getData(word)


})


async function getData(word) {
	loading.style.display = 'block'

  const response= await fetch(`https://www.dictionaryapi.com/api/v3/references/learners/json/${word}?key=${api}`);
  const data= await response.json();

  console.log(data)

if (typeof data[0]==='string') {

	loading.style.display='none'

  	let heading=document.createElement('h3');
  	heading.innerText = 'Did you mean?';
  	notfound.appendChild(heading);
  	data.forEach(element=>{
  		let sugget=document.createElement('span');
  		sugget.classList.add('suggeted');
  		sugget.innerText=element;
  		notfound.appendChild(sugget)	
  	});
  	return;
  }


  if (!data.length) {
  	loading.style.display='none'
  	notfound.innerText='Not Found';
  	return;
  }

  // result found
  loading.style.display='none'
  
  let define=data[0].shortdef[0];
  defbox.innerText=define

  // sound
  
  const sound=data[0].hwi.prs[0].sound.audio;

  if(sound){
  	render(sound);
  }


  console.log(data);
}


function render(sound) {
	// https://media.merriam-webster.com/soundc11
	let subfolder=sound.charAt(0);
	let soundsrc= `https://media.merriam-webster.com/soundc11/${subfolder}/${sound}.wav?keys=${api}`

	let aud=document.createElement('audio');
	aud.src=soundsrc;
	aud.controls=true;
	audioBox.appendChild(aud)


}