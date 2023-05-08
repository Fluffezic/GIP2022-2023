/**
 * 
 */
Vue.createApp({
    data() {
      	return {
        	message: 'Hello Vue!'
		
		}
     
    },
	methods: {
	  search(event) {
		let self = this
	   console.log('search')
		axios.get('http://localhost:8080/byid?id=1')
		  .then(function (response) {
			console.log("response:" + response.data.name)
		    self.message =response.data.name
		  })
		  .catch(function (error) {
		    console.log(error);
		  });
	    
	  }
}
  }).mount('#app')