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
import rva.jpa.Proizvodjac;
import rva.repository.ProizvodjacRepository;

@CrossOrigin
@RestController
@Api(tags = {"Proizvodjac CRUD operacije"})
public class ProizvodjacRestController {
	
	@Autowired
	private JdbcTemplate jdbcTemplate;

	@Autowired
	private ProizvodjacRepository proizvodjacRepository;
	
	@GetMapping("proizvodjac")
	@ApiOperation(value = "Vraća kolekciju svih proizvodjaca iz baze podataka")
	public Collection<Proizvodjac> getProizvodjaci() {
		return proizvodjacRepository.findAll();
	}
	
	@GetMapping("proizvodjac/{id}")
	@ApiOperation(value = "Vraća proizvođaca iz baze podataka čiji je id vrednost prosleđena kao path varijabla")
	public Proizvodjac getProizvodjac(@PathVariable("id") Integer id) {
		return proizvodjacRepository.getOne(id);
	}
	
	@GetMapping("proizvodjacNaziv/{naziv}")
	@ApiOperation(value = "Vraća kolekciju svih proizvođaca iz baze podataka koji u nazivu sadrže string prosleđen kao path varijabla")
	public Collection<Proizvodjac> getProizvodjacByNaziv(@PathVariable("naziv") String naziv) {
		return proizvodjacRepository.findByNazivContainingIgnoreCase(naziv);
	}
	
	@PostMapping("proizvodjac")
	@ApiOperation(value = "Upisuje proizvođaca u bazu podataka")
	public ResponseEntity<Proizvodjac> insertProizvodjac(@RequestBody Proizvodjac proizvodjac) {
		if(!proizvodjacRepository.existsById(proizvodjac.getId())) {
			proizvodjacRepository.save(proizvodjac);
			return new ResponseEntity<Proizvodjac>(HttpStatus.OK);
		}
		return new ResponseEntity<Proizvodjac>(HttpStatus.CONFLICT);
	}
	
	@PutMapping("proizvodjac")
	@ApiOperation(value = "Modifikuje postojeceg proizvođaca u bazi podataka")
	public ResponseEntity<Proizvodjac> updateProizvodjac(@RequestBody Proizvodjac proizvodjac) {
		if(!proizvodjacRepository.existsById(proizvodjac.getId())) 
		{
			return new ResponseEntity<Proizvodjac>(HttpStatus.NO_CONTENT);
		}
		proizvodjacRepository.save(proizvodjac);
		return new ResponseEntity<Proizvodjac>(HttpStatus.OK);
		
	}
	
	@DeleteMapping("proizvodjac/{id}")
	@ApiOperation(value = "Briše proizvođaca iz baze podataka čija je id vrednost prosleđena kao path varijabla")
	public ResponseEntity<Proizvodjac> deleteProizvodjac(@PathVariable("id") Integer id) {
		if(!proizvodjacRepository.existsById(id)) {
			return new ResponseEntity<Proizvodjac>(HttpStatus.NO_CONTENT);
		}
		jdbcTemplate.execute("delete from proizvod where proizvodjac = " + id);
		proizvodjacRepository.deleteById(id);
		if(id == -100) 
		{
			jdbcTemplate.execute(
					"INSERT INTO \"proizvodjac\"(\"id\", \"naziv\", \"adresa\", \"kontakt\") "
					+ "VALUES (-100, 'Naziv Test', 'Adresa Test', '+3812133555' )"
					);
		}
		return new ResponseEntity<Proizvodjac>(HttpStatus.OK);
	}
}
