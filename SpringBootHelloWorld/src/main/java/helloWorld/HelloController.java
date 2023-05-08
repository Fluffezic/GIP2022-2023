package helloWorld;

import java.util.Iterator;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
public class HelloController {
	

	@Autowired
	private CitiesRepository citiesRep;
	
	@GetMapping("/")
	public void hello() {
		System.out.println("test");
	}
	
	
	@GetMapping("/byid")
    public Cities byId(@RequestParam Integer id) {
		System.out.println("id search: " + id);
        Cities cities = citiesRep.findById(id).get();
        System.out.println(cities.getName() + " " + cities.getLatitude() + " " + cities.getLongitude());
		return cities;
    }


}
