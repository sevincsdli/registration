
<template>


  <section class="bg-gray-50 ">
    <div class="flex flex-col items-center justify-center px-6 py-8  lg:py-0 h-screen">
   
        <div class="w-full bg-white rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0 ">
            <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                    Go your account
                </h1>
                <form class="space-y-4 md:space-y-6" action="#" @submit.prevent="signIn" autocomplete="off" >
                    <div>
                        <input type="email" name="email" id="email" v-model="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:outline-sky-600 block w-full p-2.5 " placeholder="Your email..." required>
                    </div>
                    <div>
                        <input type="password" name="password" id="password" v-model="password" placeholder="Enter password..." class="focus:outline-sky-600 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 block w-full p-2.5" required>
                    </div>
                   
                  
                    <button type="submit" class="w-full text-white bg-sky-600 text-[1.12rem] hover:bg-sky-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Sign in</button>
                    <p class="text-md text-center font-light text-gray-500 ">
                        Not user? <a href="#" class="font-medium text-sky-600 hover:underline " @click="goToSignUp()">Sign up</a>
                    </p>
                </form>
                <p class="text-center text-blue-700 text-[1.1rem]">
              {{ info }}
            </p>
            <p class="text-center text-red-600 text-[1.1rem]">
              {{ error }}
            </p>
                            <img src="../assets/loading.gif" alt="" class="w-14 h-14 mx-auto" v-if="loading">

            </div>
          
        </div>
    </div>
  </section>
  
  </template>
  <style>
  </style>
  <script>
  import axios from 'axios'
  export default
  {
      data(){
          return{
           email:"",
           password:"",
           repassword:"",
           info:"",
       error:"",
       loading:false
          }
      },
      methods:
      {
    
          async signIn(){
          try {
            this.loading=true

          const response = await axios.post('login', {
            email: this.email,
            password: this.password,
          });
          if(response){
            this.loading=false
          }
          console.log('OK:', response.data);
    

          const token = response.data.token;
        localStorage.setItem('Token', token);
          this.email = '';
          this.password = '';
        } catch (error) {
          this.loading=false
          this.error=error.message;
          console.error('Login failed:::', error);
        }
          },
          goToSignUp(){
      
                  this.$router.push({ path: "/register"});
  
          }
  
  
      }
  }
  </script>