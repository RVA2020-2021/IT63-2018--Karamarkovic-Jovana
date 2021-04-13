package rva.repository;

import java.util.Collection;
//import java.util.Date;

import org.springframework.data.jpa.repository.JpaRepository;

import rva.jpa.Racun;

public interface RacunRepository extends JpaRepository<Racun, Integer>{

	Collection<Racun> findByNacinPlacanjaContainingIgnoreCase(String nacin_placanja);
	
}
