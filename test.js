    value = ""
test(value)
    function test(value) {
                      // if ( /[0-9]/.test(value) &&  value != null) {
                      //     console.log("ok")
                      //     return true
                      // } else {
                      //     console.log("Invalid Entry: only one letter A-Z, a-z or ?")
                      // }

                      result = false

                      if((value % 1) != 0) {
                      		console.log("Please enter a whole number")
                      } else {
                      		if(value < 0) {
                      			console.log("Please enter a positive number")
                      		} else {
                      			if(value == "") {
                      				console.log("An numeric entry must be made")
                      			} else {
                      				if(/[0-9]/.test(value)) {
                      					console.log(/[0-9]/.test(value))
                      					result = true
                      				}
                      			}
                      		}
                      }

                      console.log(result)                    
                }
