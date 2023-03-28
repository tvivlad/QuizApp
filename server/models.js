import Sequelize from 'sequelize'
import {seq} from './service/db.js'
export const User = seq.define("user", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
    unique: true
  },
  name: {
    type: Sequelize.STRING,
    /* allowNull: false */
  },
  surname: {
    type: Sequelize.STRING,
    /* allowNull: false */
  },
  email:{
    type:Sequelize.STRING,
    allowNull:false
  },
  password:{
    type:Sequelize.STRING,
    allowNull:false
  },
  role:{
    type: Sequelize.INTEGER,
    allowNull:false
  }
})

export const Quiz = seq.define("quiz", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
    unique: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  quizImage:{
    type:Sequelize.STRING,
    allowNull: false
  },
  isTest:{
    type: Sequelize.BOOLEAN,
    allowNull: false  
  },
  createDate:{
    type:Sequelize.DATE,
    allowNull:false
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false
  },
  showInList:{
    type: Sequelize.BOOLEAN,
    allowNull: false  
  }
})

export const Question = seq.define("question", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
    unique: true
  },
  text: {
    type: Sequelize.STRING,
    allowNull: false
  },
  imageUrl:{
    type:Sequelize.STRING,
    allowNull: false
  }
})

export const Answer=seq.define("answer", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
    unique: true
  },
  answer: {
    type: Sequelize.STRING,
    allowNull: false
  },
  imageUrl:{
    type:Sequelize.STRING,
    allowNull: false
  }, 
  correct:{
    type:Sequelize.TINYINT,
    allowNull: false
  }  
})

export const Attempt=seq.define("attempt", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
    unique: true
  }
})

export const TestResult=seq.define("testresult", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
    unique: true
  } 
})

User.hasMany(Quiz)
Quiz.hasMany(Question)
Question.hasMany(Answer)
Quiz.hasMany(Attempt)
Quiz.hasMany(Answer)
User.hasMany(Attempt)
Question.hasMany(TestResult)
Answer.hasMany(TestResult)
Attempt.hasMany(TestResult)