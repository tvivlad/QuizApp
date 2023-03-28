import React from 'react'
import ToolbarStyle from '../styles/toolbar.module.css'
import SortSelect from './UI/SortSelect/SortSelect'
import FilterSelect from './UI/FilterSelect/FilterSelect'
import CustomInput from './UI/CustomInput/CustomInput'

export default function Toolbar({toolBar, setToolBar}) {
  return (
  <>  
    <div className={ToolbarStyle.toolbar}> 
      <SortSelect 
          defaultValue={'Сортировка'} 
          options={[
                    {value:'createDate', name:'по дате создания'},
                    {value:'name', name:'по названию'}
          ]}
          value={toolBar.sort}
          onChange={selectedSort=>setToolBar({...toolBar, sort: selectedSort})}
      />
      <FilterSelect 
          defaultValue={'Фильтрация'}
          options={[
                    {value:1, name:'Тесты'},
                    {value:0, name:'Опросы'},
                    {value:'', name:'Все'}
          ]}    
          value={toolBar.filter}
          onChange={selectedFilter=>setToolBar({...toolBar, filter:selectedFilter})}
      /> 
      <CustomInput 
          placeholder='Поиск...'
          value={toolBar.query}
          onChange={event=>setToolBar({...toolBar, query:event.target.value})}
      />
    </div>
    <div className={ToolbarStyle.toolbarStaticBlock}>

    </div>
  </>

  )
}
