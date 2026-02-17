document.querySelectorAll(".teacher").forEach(el=>{

new bootstrap.Popover(el,{
trigger:"hover",
placement:"top",
html:true,
content:`
<div>
<img src="assets/teacher.jpg" class="teacher-img">
<div>
<strong>${el.innerText}</strong><br>
<span>Faculty Member</span>
</div>
</div>`
});

});
