#/bin/bash


init_custom_db() {
	
	# Import graphs
	if ! graphs_exist; then
		echo "Running: python manage.py packages -o import_graphs"
		python manage.py packages -o import_graphs
	else
		echo "Graphs already exist in the database. Skipping 'import_graphs'."
	fi
	
	# Import concepts
	if ! concepts_exist; then
		import_reference_data cvast_arches/db/schemes/arches_concept_scheme.rdf
		import_reference_data cvast_arches/db/schemes/cvast_concept_scheme.rdf
	else
		echo "Concepts already exist in the database."
		echo "Skipping 'arches_concept_scheme.rdf'."		
		echo "Skipping 'cvast_concept_scheme.rdf'."		
	fi
	
	# Import collections
	if ! collections_exist; then
		import_reference_data cvast_arches/db/schemes/arches_concept_collections.rdf
	else
		echo "Collections already exist in the database. Skipping 'import_reference_data arches_concept_collections.rdf'."
	fi
	
}

db_exists() {
	echo "Checking if database "${PGDBNAME}" exists..."
	psql -lqt -h $PGHOST -U postgres | cut -d \| -f 1 | grep -qw ${PGDBNAME}
}

graphs_exist() {
	row_count=$(psql -h ${PGHOST} -U postgres -d ${PGDBNAME} -Atc "SELECT COUNT(*) FROM public.graphs")
	if [[ ${row_count} -le 2 ]]; then
		return 1
	else 
		return 0
	fi
}

concepts_exist() {
	row_count=$(psql -h ${PGHOST} -U postgres -d ${PGDBNAME} -Atc "SELECT COUNT(*) FROM public.concepts WHERE nodetype = 'Concept'")
	if [[ ${row_count} -le 2 ]]; then
		return 1
	else 
		return 0
	fi
}

collections_exist() {
	row_count=$(psql -h ${PGHOST} -U postgres -d ${PGDBNAME} -Atc "SELECT COUNT(*) FROM public.concepts WHERE nodetype = 'Collection'")
	if [[ ${row_count} -le 1 ]]; then
		return 1
	else 
		return 0
	fi
}

import_reference_data() {
	# Import example concept schemes
	local rdf_file="$1"
	echo "Running: python manage.py packages -o import_reference_data -s \"${rdf_file}\""
	python manage.py packages -o import_reference_data -s "${rdf_file}"
}

if [[ "${DJANGO_MODE}" == "DEV" ]]; then
	init_custom_db
fi





