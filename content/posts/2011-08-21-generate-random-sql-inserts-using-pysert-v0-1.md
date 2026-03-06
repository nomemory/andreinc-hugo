+++
title = "Generate random SQL inserts using pysert"
date = "2021-01-20"
usekatex = true
categories = ["programming"]
tags = ["python"]
+++

[**pysert**](https://github.com/nomemory/pysert/blob/main/pysert.py) (lowercase 'p') is a python utility designed to generate random SQL `INSERT` statements from predefined templates. While its primary focus is SQL, its template-driven nature allows it to generate almost any structured format, including `JSON`, `XML`, or `YAML`.

If you need a more robust, production-grade Java solution, I recommend checking out [MockNeat](https://www.mockneat.com), which offers similar functionality with a significantly larger feature set.

# Getting Started

The script requires `python 3.x`. First, clone the repository:

```shell
gh repo clone nomemory/pysert
```

You can then run the script by providing an input template and an output destination:

```bash
python3 pysert.py -i tmpl.xml -o out.txt
```

# Defining the Template

The behavior of the script is controlled by an XML file. This file consists of a **Declarative Area**, where you define your data sources, and a **Template**, which defines the final structure.



Example `tmpl.xml`:

```xml
<pysert iterations="20">
    <dataset name="id" type="Sequence" start="300" increment="1"/>
    <dataset name="fname" type="PersonalName" firstname="True" lastname="False"/>
    <dataset name="lname" type="PersonalName" firstname="False" lastname="True"/>
    <dataset name="jobid" type="RandomNumber" floating="False" min="100" max="200"/>
    <dataset name="salary" type="RandomNumber" floating="False" min="1000" max="15000"/>
    
    <template>
INSERT INTO EMPLOYEES
    (EMPLOYEE_ID, FIRST_NAME, LAST_NAME, EMAIL, JOB_ID, SALARY)
VALUES
    (#{id}, '#{fname}', '#{lname}', '#{fname}_#{lname}@domain.com', #{jobid}, #{salary});
    </template>
 </pysert>
```

# Generated Output

Running the script with the template above produces the following SQL:

```sql
INSERT INTO EMPLOYEES
    (EMPLOYEE_ID, FIRST_NAME, LAST_NAME, EMAIL, JOB_ID, SALARY)
VALUES
    (300, 'Paula', 'Chehachkov', 'Paula_Chehachkov@domain.com', 175, 8439);

INSERT INTO EMPLOYEES
    (EMPLOYEE_ID, FIRST_NAME, LAST_NAME, EMAIL, JOB_ID, SALARY)
VALUES
    (301, 'Gabriel', 'Vlas', 'Gabriel_Vlas@domain.com', 183, 11362);

-- (... and so on for 20 iterations)  
```

# Available Datasets

You can currently use the following built-in datasets:

* **RandomNumber**: Generates integers or floats within a range.
    * `floating`: (bool), `min`: (int), `max`: (int)
* **LoremIpsum**: Generates placeholder text.
    * `length`: (int)
* **PersonalName**: Generates realistic names.
    * `firstname`: (bool), `lastname`: (bool)
* **Sequence**: Generates a standard incremental counter.
    * `start`: (int), `increment`: (int)

### Extending pysert

If you need a custom data generator, you can extend the script by following these steps:

1.  **Extend** the `AbstractDataSet` class.
2.  **Override** `validation_list(self)`: Define the properties your dataset requires so the script can validate the XML input.
3.  **Override** `next_value(self)`: Implement the logic that generates the random or arbitrary data.