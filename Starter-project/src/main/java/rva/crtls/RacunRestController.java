package rva.crtls;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import rva.jpa.Racun;
import rva.repository.RacunRepository;

@CrossOrigin
@RestController
@Api(tags = {"Racun CRUD operacije"})
public class RacunRestController {

	@Autowired
	private JdbcTemplate jdbcTemplate;
	
	@Autowired 
	private RacunRepository racunRepository;
	
	@GetMapping("racun")
	@ApiOperation(value = "Vraća kolekciju svih racuna iz baze podataka")
	public Collection<Racun> getRacuni() {
		return racunRepository.findAll();
	}
	
	@GetMapping("racun/{id}")
	@ApiOperation(value = "Vraća racun iz baze podataka čiji je id vrednost prosleđena kao path varijabla")
	public Racun getRacun(@PathVariable("id") Integer id) 
	{
		return racunRepository.getOne(id);
	}
	
	@GetMapping("racuniNP/{nacin_placanja}")
	@ApiOperation(value = "Vraća kolekciju svih racuna  iz baze podataka koji u nacinu placanja sadrže string prosleđen kao path varijabla")
	public Collection<Racun> getRacunByNaziv(@PathVariable("nacin_placanja") String nacin_placanja)
	{
		return racunRepository.findByNacinPlacanjaContainingIgnoreCase(nacin_placanja);
	}
	
	@PostMapping("racun")
	@ApiOperation(value = "Upisuje racun u bazu podataka")
	public ResponseEntity<Racun> insertRacun(@RequestBody Racun racun) {
		if(!racunRepository.existsById(racun.getId())) {
			racunRepository.save(racun);
			return  new ResponseEntity<Racun>(HttpStatus.OK);
		}
		return new ResponseEntity<Racun>(HttpStatus.CONFLICT);
	}
	
	@PutMapping("racun")
	@ApiOperation(value = "Modifikuje postojeci racun u bazi podataka")
	public ResponseEntity<Racun> updateRacun(@RequestBody Racun racun)
	{
		if(!racunRepository.existsById(racun.getId())) {
			return new ResponseEntity<Racun>(HttpStatus.NO_CONTENT);
		}
		racunRepository.save(racun);
		return new ResponseEntity<Racun>(HttpStatus.OK);
	}
	
	@DeleteMapping("racun/{id}")
	@ApiOperation(value = "Briše racun iz baze podataka čija je id vrednost prosleđena kao path varijabla")
	public ResponseEntity<Racun> deleteRacun(@PathVariable("id") Integer id) {
		if(!racunRepository.existsById(id)) {
			return new ResponseEntity<Racun>(HttpStatus.NO_CONTENT);
		}
		jdbcTemplate.execute("delete from stavka_racuna where racun = " + id);
		racunRepository.deleteById(id);
		if(id == -100)
		{
			jdbcTemplate.execute(
					"INSERT INTO \"racun\"(\"id\", \"datum\", \"nacin_placanja\") "
					+ "VALUES (-100, '2021-03-03', 'NP Test' )" 
					);
		}
		return new ResponseEntity<Racun>(HttpStatus.OK);
	}
	
}
