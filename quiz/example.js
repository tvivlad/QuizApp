let sel=document.querySelector('.select')

sel.addEventListener('change', (event)=>{
    console.log('Значение выбранного option : ', event.target.value, ' компонента : ' , event.target )
})