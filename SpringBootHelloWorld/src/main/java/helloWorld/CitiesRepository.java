package helloWorld;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import helloWorld.Cities;

@Repository
public interface CitiesRepository extends CrudRepository<Cities, Integer>{
	
	
}
