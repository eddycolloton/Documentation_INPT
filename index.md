---
layout: default
---

##### INPT is a bash scripting project created for TBMA processing at HMSG. 

INPT takes media files as input, typically from an external hard drive, and outputs metadata files according to the HMSG directory structure and naming conventions.
* * *
## Contents
- [Introduciton](#introduction)
  - [HMSG Workflow](#hmsg-workflow)
  - [INPUTS](#inputs)
  - [OUTPUTS](#outputs)
- [Usage: Start Input](#usage-start-input)
  - [input.csv](#inputcsv)
  - [Options](#options)
  - [Input Prompts](#input-prompts)
- [Usage: Start Output](#usage-start-output)
  - [output.csv](#outputcsv)
  - [Output Prompts](#output-prompts)
- [Logs](#logs)
- [Setup](#setup)
- [Use Cases](#use-cases)
  - [Use Case 1](#use-case-1)
  - [Use Case 2](#use-case-2)
  - [Use Case 3](#use-case-3)
- [Code Structure](#code-structure)

* * *
# Introduction

### HMSG Workflow

HMSG stores technical metadata on TBMA in 3 different locations, for 3 different purposes:

1. Metadata sidecar files in the staging directory. These are temporary. They're at hand when viewing the artwork media. But the media will ultimately be ingest into the SI DAMS, and the staging directory discarded. 
2. Metadata sidecar files in the artwork file. These are for long term storage. 
3. The appendix to the conservation report. The contents of the sidecar metadata files (with a few exceptions) are written to a text file named appendix.txt, stored in the 'Condition_Tmt Reports' directory of the artwork file. Once assessment of the media is complete, the appendix.txt file will be attached to the conservation report in TMS.

The bash scripts in INPT write data to all 3 of these locations.

## INPUTS

In order to name and organize artwork metadata according to HMSG's conventions, the following information must be collected.

*   Artist's First Name
*   Artist's Last Name
*   Artwork Title
*   Accession Number
*   Path to Artwork File on T: Drive
*   Staging Directory on DroBo
*   Path to hard drive
*   Path to Technical Info_Specs directory
*   Path to Technical Info_Specs/Sidecars directory
*   Path to Condition_Tmt Reports directory
*   Path Artwork Files parent directory
*   Path to the Time-based Media Artworks directory on the TBMA DroBo

Any of this data can be provided before running start_input.sh via the input.csv. The CSV can contain as much or as little data as desired.

| metadata field      | value        |
|:--------------------|:-------------|
| Artist's First Name | Diana        |
| Artist's Last Name  | Thater       |
| Artwork Title       | Oo Fifi...   |
| Accession Number    | 03.9         |

The input csv is run as an "argument" to start_input.sh like this:   
`./start_input.sh input.csv`

A template of the CSV is provided: `INPT/csv_templates/input_template.csv`

Information not in the input.csv where possible, is inferred from the other inputs. For example, if the artist's last name is known, the artwork files are searched for a match.
If a metadata field cannot be inferred, the user will be prompted to input the information manually.

## OUTPUTS

Once the input information has been collected there are a variety of options for output. 

*   Move all files to staging directory
*   Select files to move to staging directory
*   Run all tools
*   Run tree on volume
*   Run siegfried on files in staging directory
*   Run MediaInfo on video files in staging directory
*   Run Exiftool on media files in staging directory
*   Create framdemd5 output for video files in staging directory
*   Create QCTools reports for video files in staging directory

Just as with inputs, any of these options can be selected before running the script via the output.csv.
A "1" in the 2nd column indicates the option has been selected, a "0" indicates the option is declined. 

| output option                             | selection    |
|:------------------------------------------|:-------------|
| Move all files to staging directory       | 1            |
| Select files to move to staging directory | 0            |
| Run all tools                             | 1            |
| Run tree on volume                        | 0            |

The output csv is run as an "argument" to start_output.sh like this:   
`./start_output.sh output.csv`

A template of the CSV is provided: `INPT/csv_templates/output_template.csv`

When start_input.sh completes, it outputs an input.csv that documents the information gathered during the input process. This filled out input.csv file can be provided to start_output.sh to resume processing an artwork, or run additional output options.
Similarly, both an input.csv and an output.csv can be provided to start_input.sh to run an "end-to-end" process without any manual intervention. 

# Usage: Start Input  

<div style="padding:75% 0 0 0;position:relative;">
  <iframe src="https://player.vimeo.com/video/921551540?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="start_input_manual_walkthrough"></iframe>
</div>
<script src="https://player.vimeo.com/api/player.js"></script>

<div style="padding:75% 0 0 0;position:relative;">
  <iframe src="https://player.vimeo.com/video/921553466?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="start_input_csv_walkthrough"></iframe>
</div>
<script src="https://player.vimeo.com/api/player.js"></script>

```
./start_input [options] [optional input.csv] [optional output.csv]

Options:
--help, -h
	Display this text.
--stop, -s
	Stop process after start_input.sh, do not proceed to start_output.sh
--typo, -t
	Confirm manually input text
```
## input.csv

All of the information necessary to run INPT can be provided via a CSV. An example of the input.csv is in `INPT/csv_templates/`  
The input.csv contains 2 columns: metadata fields, and metadata values. start_input.sh can be run with none of the metadata values, or all of them.  
Metadata values added to the 2nd column should be enclosed in "double quotes", especially if they contain spaces or commas.   
Directory paths can be in either escaped paths (like this: Lastname\,\ Firstname/time-based\ media/2024.004_Sometitle) or regular file paths (like this: Lastname, Firstname/time-based media/2024.004_Sometitle)  
The "Path Artwork Files parent directory" and "Path to the Time-based Media Artworks directory on the TBMA DroBo" have default values for use at the HMSG media lab. Default values are assumed unless they are missing, or supersede by the input.csv.  
When start_input.sh completes, it outputs an input.csv that documents the information gathered during the input process. Some of the metadata fields are intended only for this purpose. 

Here are the metadata fields listed in column 1 of input.csv:
<dl>
<dt>Artist's First Name</dt>
<dd>First name of the artist as it appears in the Artwork File (or will appear in new Artwork File)</dd>
<dt>Artist's Last Name</dt>
<dd>Last name of the artist as it appears in the Artwork File (or will appear in new Artwork File)</dd>
<dt>Artwork Title</dt>
<dd>Titles containing spaces or special characters (,.*!) should be in double quotes ""</dd>
<dt>Accession Number</dt>
<dd>Accession number of artwork. For artwork's without an existing Artwork File, use YYYY.### format, for works with an existing Artwork File, use existing accession format (such as YY.##).</dd>
<dt>Path to Artwork File on T: Drive</dt>
<dd>The path to the artwork file often can be inferred from artist's name or the accession number, but can be read from the input.csv as well.</dd>
<dt>Staging Directory on DroBo</dt>
<dd>The path to the Staging Directory also often can be inferred from artist's name or the accession number, or can be read from the input.csv.</dd>
<dt>Path to hard drive</dt>
<dd>The path to the volume or directory that stores the media to be processed (typically an external hard drive)</dd>
<dt>Path to Technical Info_Specs directory</dt>
<dd>This field is intended to be filled out at the completion of the start_input.sh process</dd>
<dt>Path to Technical Info_Specs/Sidecars directory</dt>
<dd>This field is intended to be filled out at the completion of the start_input.sh process</dd>
<dt>Path to Condition_Tmt Reports directory</dt>
<dd>This field is intended to be filled out at the completion of the start_input.sh process</dd>
<dt>Path Artwork Files parent directory</dt>
<dd>The path to the directory that stores all of the artwork files on the T: Drive, currently: "/Volumes/Shared/departments/CONSERVATION/ARTWORK FILES".</dd>
<dd>It is recommended that this metadata value stay "fixed" in the template</dd>
<dt>Path to the Time-based Media Artworks directory on the TBMA DroBo</dt>
<dd>The path to the "Time-based Media Artworks" directory on the DroBo that stores all of the TBM media staged prior to ingest into SI DAMS.</dd>
<dd>It is recommended that this metadata value stay "fixed" in the template.</dd>
</dl>

## Options

start_input has multiple options that are used to pass parameters to a program. 
Each option (sometimes called 'switches' or 'flags') can either be called with a single dash ('-') and one letter, or two dashes and a word.

`-t, --typo`  
With the typo check on, after every prompt for manual input, a second prompt will give the option to "go back a step" if the input was incorrect.  

```
2024-02-20 - 15.50.17 - The title manually input: Untitled
 ________________________________________ 
/ Just checking for typos - Is the title \
\ entered correctly?                     /
 ---------------------------------------- 
        \   ^__^
         \  (oo)\_______
            (__)\       )\/\
                ||----w |
                ||     ||
1) yes
2) no, go back a step
```

`-s, --stop`  
The'--stop' option prevents start_output.sh from starting automatically after start_input.sh. 
The output of this process will be an input.csv with every metadata field filled out, stored in the artwork file.   
Use the stop option if you are not ready to decide which files will be moved to the staging directory and/or which tools will be run on those files.    
You can resume the process by running start_output.sh with the completed input.csv like this: `./start_output.sh input.csv` 

`-h, --help`
Display basic script usage:
```
INPT is a bash scripting project created for TBMA processing at HMSG.

./start_input [options] [optional input.csv] [optional output.csv]

Options:
--help, -h
	Display this text.
--stop, -s
	Stop process after start_input.sh, do not proceed to start_output.sh
--typo, -t
	Confirm manually input text
```

## Input Prompts

Any information not provided in the input.csv, that cannot be inferred from contextual information, will be manually typed in to terminal. 
The script will prompt the user for these necessary inputs. 
If you plan to manually enter information it is recommended that you run the script with the -t or --typo option, like this: `./start_input --typo`

##### Artist's Name
When start_.input.sh is run without any input.csv you will first be prompted:
- Input artist's first name
- Input artist's last name
  - start_input.sh will search the artwork files for a directory that has the artist's name

Once the artist's name has been manually input, if the artwork file exists, the path to the artwork file, as well as the accession number of the artwork, will be inferred by start_input.sh.  
When inputs are found by start_input.sh they are printed to the terminal in magenta. 

##### Path to the artwork file
If the artwork file is not found or does not exists, you will be prompted:
- Enter a number to set the path to the Artwork File on the T:\ drive
  - Input path
    - If the artwork file does exists, but was not found, choose this option
  - Create Artwork File
    - If the artwork file does not exist, choose this option
    - In order to create the artwork file, you will be prompted to manually input both tha accession number and title of the artwork 

##### Path to the staging directory
Like with the artwork files, if the staging directory on the TBMA DroBo already exists, start_input.sh will infer those inputs.
Otherwise, you will prompted to either input the path or create the staging directory. 
- Enter a number to set the path to the staging directory on the TBMA DroBo
  - Input path
    -  If the staging directory does exists, but was not found, choose this option
  - Create Staging Directory
    - If the staging directory does not exist, choose this option
    - If the accession number and artist's name are known (likely by this prompt), no further information will be manually input

##### Path to the volume
Finally you will be prompted to input the path to the "Volume" or the hard drive that contains files to be processed.
Mounted volumes are searched for the artist's last name and, if known, the title. Any matches are presented as options for selection, otherwise the prompt must be entered manually. 

##### Path to the output directories
With this information the path to the directories in the artwork files where outputs (the "Technical Info_Specs" directory or the "Condition_Tmt Reports" directory) will be written can likely be inferred. 
If the artwork file does not match the expected structure you will be prompted to input the parent directory (the directory directly above) where you want either the "Technical Info_Specs" directory or the "Condition_Tmt Reports" directory of the artwork file.
- Select a directory to create the Condition_Tmt Reports (or Technical Info_Specs) directory, or choose to quit
  - /path/to/artwork file/
    - Create either the Condition_Tmt Reports or the Technical Info_Specs directory directly below the artwork file
  - Enter path to parent directory
    - Manually input the path to the parent directory of either the Condition_Tmt Reports or the Technical Info_Specs directory. Output directory will be made inside that directory. 
  - Quit

##### Declared variables

When start_input.sh completes, it will have collected (or created) the aforementioned inputs listed in the INPUTS section of the introduction. These inputs are saved to an input.csv with each row filled out. This input.csv can be used to resume the start_output.sh process later. In the event of an error, the input.csv can simply be edited and then provided to start_output.sh to avoid re-running start_input.sh. 

The variables are also recorded to the log file. The log file can be used as a troubleshooting tool if you encounter unexpected behavior or results.

##### Known Paths

start_input.sh assumes that the script is being run in the HMSG media lab. The default directory paths to certain "locations" are assumed, and you will only be prompted to enter the paths if they are not found at the expected path.

The 2 assumed known paths are:
* The artwork files parent directory on the shared T:\ drive
* The "Time-based Media Artworks" directory on the TBMA DroBo

If either the artwork files directory or time-based media artworks directory are not in the expected location, or not connected to the computer, you will be prompted for the path, like this:
```
 ______________________________ 
/ Please input the path to the \
| ARTWORK FILES directory from |
| the T:\ drive. Feel free to  |
| drag and drop the directory  |
\ into terminal:               /
 ------------------------------ 
        \   ^__^
         \  (oo)\_______
            (__)\       )\/\
                ||----w |
                ||     ||
```
Follow this prompt to provide the path to the directory.   
At the time of writing the path to the artwork file was: `/Volumes/Shared/departments/CONSERVATION/ARTWORK FILES`   
At the time of writing the path to the time-based media artworks directory on the DroBo was: `/Volumes/TBMA DroBo/Time-based Media Artworks/`

# Usage: Start Output  
<div style="padding:75% 0 0 0;position:relative;">
  <iframe src="https://player.vimeo.com/video/936446837?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="start_output_manual_walkthrough"></iframe>
</div>
<script src="https://player.vimeo.com/api/player.js"></script>

<div style="padding:75% 0 0 0;position:relative;">
  <iframe src="https://player.vimeo.com/video/936446570?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="start_output_csv_walkthrough"></iframe>
</div>
<script src="https://player.vimeo.com/api/player.js"></script>
```
./start_output [optional input.csv] [optional output.csv]
```

## output.csv

The selection of files and tools to be run by INPT can be provided via a CSV. An example of the output.csv is in `INPT/csv_templates/`  
The output.csv contains 2 columns: an output option, and an output selection (0 or 1). start_output.sh can be run with none of the output options selected, or all of them.  
Values added to the 2nd column should only be a "0" or a "1". The "1" indicates that the output option has been selected and "0' indicates the option will not be run.  
Certain options override others, for example if 'Run all tools' is set to '1' than the individual tool selection is ignored.  

Options left blank will result in a prompt when start_output.sh is run. 

Here are the output options listed in column 1 of input.csv:
<dl>
<dt>Move all files to staging directory</dt>
<dd>Move all files from the volume (excluding system files like .DS_Store) to the staging directory and confirm fixity. If this is set to '1' than the value of the 'Select files to move to staging directory' will be ignored.</dd>
<dt>Select files to move to staging directory</dt>
<dd>If 'Move all files to staging directory' is set to '0' or is left blank, this option produces a prompt that asks you to choose specific directories or files from the volume to transfer to the staging directory and confirm fixity.</dd>
<dt>Run all tools</dt>
<dd>Run all metadata tools on files once they've been moved to the staging directory. If this is set to '1', the values of the individual tool options below will be ignored.</dd>
<dt>Run tree on volume</dt>
<dd>Assuming 'Run all tools' is '0' or blank, choose to run tree on the volume and output to sidecar text file with the filename: '[volume_name]_tree_output.txt'</dd>
<dt>Run siegfried on files in staging directory</dt>
<dd>Assuming 'Run all tools' is '0' or blank, choose to run siegfried on files in the staging directory, which is output to individual sidecar files with the filename: '[filename]_sf.txt'</dd>
<dt>Run MediaInfo on video files in staging directory</dt>
<dd>Assuming 'Run all tools' is '0' or blank, this will run 'MediaInfo -f' on only audio or video files in the staging directory, which is output to individual sidecar files with the filename: '[filename]_mediainfo.txt'</dd>
<dt>Run Exiftool on media files in staging directory</dt>
<dd>Assuming 'Run all tools' is '0' or blank, this will run exiftool on only image, audio or video files in the staging directory, which is output to individual sidecar files with the filename: '[filename]_exif.txt'</dd>
<dt>Create framdemd5 output for video files in staging directory</dt>
<dd>Assuming 'Run all tools' is '0' or blank, this will run an ffmpeg command on only audio or video files in the staging directory to create an md5 checksum per frame, which is output to individual sidecar files with the filename: '[filename]framemd5.txt'</dd>
<dt>Create QCTools reports for video files in staging directory</dt>
<dd>Assuming 'Run all tools' is '0' or blank, this will run QCTools on only audio or video files in the staging directory, which is output to QCTools report with the filename: '[filename].qctools.mkv'</dd>
</dl>

## Output Prompts

Any options left blank in the output.csv, that are not overridden by other selected options, will be manually selected in terminal. 
The script will prompt the user for these necessary selections. 
Each new selection will give you the option to "go back a step" if necessary, so don't worry if you hit "1" when you meant to hit "2".

##### Path to existing artwork file

start_output.sh is intended to be run with an existing artwork file created by start_input.sh.   
If an input.csv is not provided to start_output.sh you will be prompted to provide the path to an artwork file containing an input.csv.

```
If you would like to run start_output.sh on an artwork that has a completed input.csv, 
type or drag and drop the path of the artwork file:
```
   
If there is more than one input.csv in the artwork file, additional prompts will follow to determine which csv should be used:

```
More than one CSV found in Art File. Use most recent?
1) Yes
2) No, show all CSVs
```

##### Checksum manifest

If the output.csv has 'Select files to move to staging directory' selected or left blank, then the artwork file will be searched for files with a '_manifest.md5' suffix.   
If existing md5 checksum manifests are found, you will be notified via a prompt like this one: 
```
 _________________________________________ 
/ Checksum manifest found in Artwork      \
| File! Checksums from the following      |
| files were found in                     |
| /path/to/Technical                      |
\ Info_Specs:                             /
 ----------------------------------------- 
        \   ^__^
         \  (oo)\_______
            (__)\       )\/\
                ||----w |
                ||     ||
```
Following the prompt will be a list of all files in any manifests found in the artwork file.   
This prompt is intended to prevent files being transferred multiple times unintentionally.

##### Select Files

If the output.csv has 'Select files to move to staging directory' selected or left blank (and 'Move all files to staging directory' is not selected), you will be prompted to select how many files you want to move form the volume to the staging directory.
```
Copy all files from the volume to the staging directory?
1) yes				 3) no, specific files
2) no, only certain directories	 4) none
```

If you choose either 'no, specific files' or 'no, only certain directories' you will be presented with a list of either the files or directories on the volume.   
You'll then be able to select each file/directory you want to transfer, one at a time, iteratively, until you've selected all of them. 

```
 _________________________________________ 
/ Select individual files from the list   \
| below, one at a time. Type the          |
| corresponding number and press enter to |
| select one. Repeat as necessary. Once   |
| all the directories have been selected, |
\ press enter again.                      /
 ----------------------------------------- 
        \   ^__^
         \  (**)\_______
            (__)\       )\/\
             U  ||----w |
                ||     ||
Avaliable options:
  1 ) /Volumes/Artwork/instructions.pdf
  2 ) /Volumes/Artwork/smpte_bars_prores_ch1.mov
  3 ) /Volumes/Artwork/smpte_bars_prores_ch3.mov
  4 ) /Volumes/Artwork/smpte_bars_prores_ch2.mov
Check an option (again to uncheck, ENTER when done): 
2
Avaliable options:
  1 ) /Volumes/Artwork/instructions.pdf
  2+) /Volumes/Artwork/smpte_bars_prores_ch1.mov
  3 ) /Volumes/Artwork/smpte_bars_prores_ch3.mov
  4 ) /Volumes/Artwork/smpte_bars_prores_ch2.mov
/Volumes/Artwork/smpte_bars_prores_ch1.mov was checked
Check an option (again to uncheck, ENTER when done): 
3
Avaliable options:
  1 ) /Volumes/Artwork/instructions.pdf
  2+) /Volumes/Artwork/smpte_bars_prores_ch1.mov
  3+) /Volumes/Artwork/smpte_bars_prores_ch3.mov
  4 ) /Volumes/Artwork/smpte_bars_prores_ch2.mov
/Volumes/Artwork/smpte_bars_prores_ch3.mov was checked
Check an option (again to uncheck, ENTER when done):
```

Once a '+' is by each file/directory you wish to select, hit ENTER again to confirm your choices.

##### Run All Tools

If no output.csv is provided, you will be prompted to select which tools to run.   
After each selection you will have a chance to 'go back a step' and change your selection in case of a mistake. If it is the last prompt, you will be asked to confirm your selection. 
```
Run metadata tools (tree, siegfried, MediaInfo, Exiftool, framemd5, and qctools) on files copied to [path to staging directory] (Choose a number 1-2)
1) yes
2) no
#? 1

Confirm you would like to run all metadata tools:
1) yes
2) no
#? 
```

##### Run Individual Tools

If you do not choose to run all tools, you will be prompted to choose which tools to run individually. After each selection you will have a chance to 'go back a step' and change your selection in case of a mistake. If it is the last prompt, you will be asked to confirm your selection. 
```
*************************************************
This will be the final prompt, and applications will run after this response!
Create QCTools reports for each of the video files in [staging directory] (Choose a number 1-2)
*************************************************

1) yes
2) no
3) go back a step
#? 1

Confirm you would like to create QCTools reports for each of the video files in [staging directory]:
1) yes
2) no
```

After the final prompt the script will run. Your selected files will be moved to the staging directory and their fixity will be verified. Then, all selected tools will run on the files in the staging directory. 
* * *

# Logs

As soon as `./start_input.sh` is run a log is created in the `/INPT/logs` directory using the following naming convention:
`YYYY-MM-DD-HH.MM.SS_INPT.log`

The log contains all information collected by start_input.sh and all actions run by start_output.sh. Once start_output.sh is complete, the log is copied to the Technical Info_Specs directory in the artwork file and renamed:
`Artist Last Name_Accession Number_YYYY-MM-DD-HH.MM.SS_INPT.log`

The log documents the actions of start_input.sh and start_output.sh. It is the best place to look when troubleshooting unexpected behavior or results.

Below is a sample log:
```
====== Script started at 2024-02-19 - 14.53.09 ======
2024-02-19 - 14.53.10 - Reading CSV file: input_template.csv
2024-02-19 - 14.53.10 - Input CSV file detected: /Users/eddycolloton/git/INPT/csv_templates/input_template.csv
2024-02-19 - 14.53.10 - Reading variables from input csv: /Users/eddycolloton/git/INPT/csv_templates/input_template.csv
2024-02-19 - 14.53.10 - Successfully read variables from /Users/eddycolloton/git/INPT/csv_templates/input_template.csv
2024-02-19 - 14.53.19 - Artist name manually input: Tess McTest
2024-02-19 - 14.53.19 - No path to the artwork file found in input csv
2024-02-19 - 14.53.19 - The artwork file is /Users/eddycolloton/Documents/hmsg_directories/artwork_folders/McTest, Tess
2024-02-19 - 14.53.19 - The accession number is 1999.066 found in the artwork folder /Users/eddycolloton/Documents/hmsg_directories/artwork_folders/McTest, Tess/time-based media/1999.066_Untitled
2024-02-19 - 14.53.20 - No path to Staging Directory found in input csv
2024-02-19 - 14.53.30 - Path to the staging directory: /Users/eddycolloton/Documents/hmsg_directories/tbma_drobo/1999-066_McTest
2024-02-19 - 14.53.31 - The path to the volume from CSV: /Volumes/Artwork
2024-02-19 - 14.53.31 - No path to the Technical Info and Specs directory found in input csv
2024-02-19 - 14.53.31 - Path to the Technical Info_Specs directory: /Users/eddycolloton/Documents/hmsg_directories/artwork_folders/McTest, Tess/time-based media/1999.066_Untitled/Technical Info_Specs
2024-02-19 - 14.53.31 - Metadata output will be written to the appendix.txt file in /Users/eddycolloton/Documents/hmsg_directories/artwork_folders/McTest, Tess/time-based media/1999.066_Untitled/Technical Info_Specs
2024-02-19 - 14.53.31 - No path to the Condition_Tmt Reports directory found in input csv
2024-02-19 - 14.53.31 - Path to the Condition_Tmt Reports directory: /Users/eddycolloton/Documents/hmsg_directories/artwork_folders/McTest, Tess/time-based media/1999.066_Untitled/Condition_Tmt Reports
2024-02-19 - 14.53.31 - Metadata output will be written to the appendix.txt file in /Users/eddycolloton/Documents/hmsg_directories/artwork_folders/McTest, Tess/time-based media/1999.066_Untitled/Condition_Tmt Reports
2024-02-19 - 14.53.31 - start_input.sh complete:
----------------------->The artist name is Tess McTest
----------------------->The title of the work is 
----------------------->The accession number is 1999.066
----------------------->The artwork folder is /Users/eddycolloton/Documents/hmsg_directories/artwork_folders/McTest, Tess
----------------------->The staging directory is /Users/eddycolloton/Documents/hmsg_directories/tbma_drobo/1999-066_McTest
----------------------->The volume path is /Volumes/Artwork
2024-02-19 - 14.53.31 - Declared variables have been written to /Users/eddycolloton/Documents/hmsg_directories/artwork_folders/McTest, Tess/time-based media/1999.066_Untitled/Technical Info_Specs/McTest_1999.066_2024-02-19-14.53.31.csv
2024-02-19 - 14.53.31 - Comparing McTest_1999.066_2024-02-19-14.53.31.csv with McTest_1999.066_2024-02-19-14.13.13.csv
2024-02-19 - 14.53.31 - Differences in McTest_1999.066_2024-02-19-14.13.13.csv CSV found
2024-02-19 - 14.54.27 - Moving old CSV file: /Users/eddycolloton/Documents/hmsg_directories/artwork_folders/McTest, Tess/time-based media/1999.066_Untitled/Technical Info_Specs/McTest_1999.066_2024-02-19-14.13.13.csv
2024-02-19 - 14.54.27 - Created old_CSVs directory and moved pre-existing CSV file
2024-02-19 - 14.54.27 - start_input.sh complete! Beginning start_output.sh
2024-02-19 - 14.54.42 - The selected files are: /Volumes/Artwork/instructions.pdf

2024-02-19 - 14.54.54 ******** generating md5 checksums on selected files ******** 
md5deep will be run on /Volumes/Artwork
2024-02-19 - 14.54.54 ******** md5 checksum manifest from /Volumes/Artwork completed ******** 

		md5deep Results:
		copied to /Users/eddycolloton/Documents/hmsg_directories/tbma_drobo/1999-066_McTest and 
		/Users/eddycolloton/Documents/hmsg_directories/artwork_folders/McTest, Tess/time-based media/1999.066_Untitled/Condition_Tmt Reports/1999.066_appendix.txt
		===================> Total Execution Time: 0 m 0 s

2024-02-19 - 14.54.54 ******** copying files started ******** 
	copying individual files from the volume

	list of files copied below:
	/Volumes/Artwork/instructions.pdf

2024-02-19 - 14.54.54 ******** file copying and md5 checksum manifest from /Users/eddycolloton/Documents/hmsg_directories/tbma_drobo/1999-066_McTest completed ******** 

		rsync Results:
		manifest copied to /Users/eddycolloton/Documents/hmsg_directories/tbma_drobo/1999-066_McTest and 
		/Users/eddycolloton/Documents/hmsg_directories/artwork_folders/McTest, Tess/time-based media/1999.066_Untitled/Condition_Tmt Reports/1999.066_appendix.txt 
 rsync logs in /Users/eddycolloton/Documents/hmsg_directories/artwork_folders/McTest, Tess/time-based media/1999.066_Untitled/Technical Info_Specs
		===================> Total Execution Time: 0 m 0 s
2024-02-19 - 14.54.54 ******** checksum manifests match ******** 

		===================> Total Execution Time: 0 m 0 s
2024-02-19 - 14.54.54 - sf started! siegfried will be run on /Users/eddycolloton/Documents/hmsg_directories/tbma_drobo/1999-066_McTest
2024-02-19 - 14.54.54 - sf run on instructions.pdf
2024-02-19 - 14.54.54 - sf run on instructions.pdf
2024-02-19 - 14.54.54 - sf run on smpte_bars_prores_ch1.mov
2024-02-19 - 14.54.54 - sf run on smpte_bars_prores_ch3.mov
2024-02-19 - 14.54.55 - sf run on smpte_bars_prores_ch2.mov
2024-02-19 - 14.54.55 - sf run on smpte_bars_prores_ch2.mov.qctools.mkv
2024-02-19 - 14.54.55 - sf run on smpte_bars_prores_ch1.mov
2024-02-19 - 14.54.55 - sf run on smpte_bars_prores_ch2.mov
2024-02-19 - 14.54.55 - sf run on smpte_bars_prores_ch1.mov.qctools.mkv
2024-02-19 - 14.54.55 - ===================> siegfried complete! Total Execution Time: 0 m 1 s
2024-02-19 - 14.54.55 - siegfried output written to 1999.066_appendix.txt and saved as a sidecar file
2024-02-19 - 14.54.55 - Created old_logs directory and moved pre-existing .log files
```

INPT uses the `copyit.py` python script originally created for the open source project: [IFIscripts](https://github.com/kieranjol/IFIscripts)

The copyit.py script creates additional logs as well as all copyit.py created md5 manifests, which are stored within the repository directory.

```
INPT
├── logs
│   ├── copyit
│   │   ├── copyit_logs
│   │   └── manifests
│   │       └── old_manifests
│   └── samplelog.log
├── sample_files
└── tests
```

# Setup

The initial setup for INPT requires the macOS package manager homebrew, and preferably the command line version control software git.    
The INPT scripts can of course be simply downloaded directly from github instead of cloned from the command line.

To install homebrew, follow the instructions on the homebrew website: https://brew.sh/

With homebrew installed, if necessary, install git:   
`brew install git`

Next, clone the INPT github repository:   
`git clone https://github.com/eddycolloton/INPT.git`

Once cloned, navigate into the repository directory:   
`cd INPT`

Make the file 'dependency_check.sh' executable with the chmod command, like this:    
`chmod +x dependency_check.sh`

Run the dependency check script:    
`./dependency_check.sh`

The dependency check script cycles through each command line tool used in INPT, and if the tool is not installed, dependency_check.sh will install it using homebrew.

Once all dependencies are installed, make every file in the scripts subdirectory executable:   
`chmod -R +x INPT`

You can now run INPT by navigating to the INPT scripts directory and running:   
`./start_input.sh`

At any time, you can update INPT by running
`git fetch && git pull` from within the INPT repository directory

# Use Cases
## Use Case 1

A multi-channel video artwork is acquired by the museum. It is the first artwork by this artist that the Hirshhorn has acquired. The acquisition has been fully processed by the registrar, so the work is now in TMS and has an accession number. There is no conservation artwork file on the T:\ drive yet. 

The artist provides an external hard drive containing only preservation and exhibition copies of their artwork as video files.

Once the external hard drive is connected to the computer in the TBMA Lab via a read/write blocker, the conservator views the drive and its contents in Finder. The conservator verifies that the drive only contains the expected preservation and exhibition copies. Next, the conservator runs the start_input.sh script in terminal. When prompted, the conservator opts to create an artwork folder using the script. The conservator manually enters the artist’s first and last name, the artwork's accession number, and the artwork’s title. With this information, the script creates an Artwork Folder on the T:\ drive. 

The conservator also opts to create a staging directory on the TBMA DroBo, where the video files will be stored prior to upload to the SI DAMS. Using the previously entered information the staging directory on the TBMA DroBo is created following the HMSG media conservation file naming conventions. 

The conservator manually enters the path to the hard drive when prompted. For this drive, the volume path is simply:    
“/Volumes/Untitled”

With this information entered into the computer, the script will search the newly created artwork file on the T:\ drive and verify that the “Condition_Tmt Reports” directory and the “Technical Info_Specs” directory can be found. Metadata files will be out to these two locations.

The start_output.sh script will now prompt the conservator to decide whether to copy all of the files from the external hard drive to the staging directory on the TBMA DroBo, or only certain files or directories. Since the only media on the external drive are artist provided preservation and exhibition files, the conservator chooses to copy all of the files to the staging directory. The script saves this choice, but does not yet copy the files. Instead, it follows the first prompt with a series of follow up questions. 

Next the script asks the conservator whether they would like to run a series of metadata tools (tree, siegfried, MediaInfo, Exiftool, framemd5, and qctools) on all of the files copied to the staging directory. Again, because the files are all artist provided preservation and exhibition copies, the conservator chooses to run all of the tools on these files. 

This prompt notes that, because the conservator is selecting the “yes” option, this will be the final prompt. Once the conservator chooses the “yes” option, the script will begin to run the metadata tools. Because the conservator has chosen to run all of the metadata tools, this process will take some time (especially if the files are large).

The script will begin by creating md5 checksums of the files on the hard drive. Next the files will be copied to the staging directory. Once there, md5 checksums will be created again. The checksums will be compared in order to confirm that no loss or errors have occurred. 

The file format identification tool siegfried will provide the PRONOM identification number, if applicable, for all of the files in the staging directory. 

MediaInfo will run on all of the video files in the staging directory, and generate technical metadata describing each of the files individually. 

Exiftool will run on still image, audio and video files, so in this example, it will run all video files on the drive. 

Ffmpeg will run on each of the video files to create a “frame md5” file, a text file which lists the md5 checksum of each of the rendered frames of the video file. This granular description of the files fixity can be used to determine how much a video file has been altered in the result of a checksum collision. 

QCTools will run on each of the video files as well, creating a “sidecar” QCTools file for each of the video files. These files can then be viewed in the QCTools GUI. 

## Use Case 2

An artist with multiple works in the Hirshhorn’s collection has a new single-channel video artwork acquired. The artwork has been presented to the TBMA committee, and correspondence, and other information about the piece has already been added to the existing artwork file. The new artwork is delivered to the museum on an external hard drive containing promotional still image files (not artwork), installation instructions, an Apple ProRes encoded exhibition copy, and a dpx sequence preservation copy. The contracting process is not complete, so the artwork does not yet have an accession number.

The external hard drive is connected to the computer in the TBMA Lab via a read/write blocker, and the conservator views the drive and its contents in Finder. The conservator verifies the drive’s contents, noting that the exhibition copy is not in a directory, and the preservation copy is in its own directory. 

The art conservator opens the input_template.csv file stored in `INPT/csv_templates/` 

The conservator enters some of the known information about the artwork:
```
Artist's First Name,
Artist's Last Name,
Artwork Title,
Accession Number,"00.00"
Path to Artwork File on T: Drive,"/Volumes/Shared/departments/CONSERVATION/ARTWORK FILES/McTest, Tess"
Staging Directory on DroBo,
Path to hard drive,"/Volumes/external_hard_drive"
Path to Technical Info_Specs directory,
Path to Technical Info_Specs/Sidecars directory,
Path to Condition_Tmt Reports directory,
Path Artwork Files parent directory,"/Volumes/Shared/departments/CONSERVATION/ARTWORK FILES"
Path to the Time-based Media Artworks directory on the TBMA DroBo,"/Volumes/TBMA Drobo/Time Based Media Artwork/"
```

The conservator does not need to specify the artist's name, because start_input.sh will be able to infer that information from the artwork file. If there were only one artwork in the artwork file, start_input.sh could infer the accession number as well.

Since the accession number does not yet exist, the conservator uses "00.00" as a placeholder. 

With this information filled in, the conservator saves the csv as `input.csv`  

The attached external hard drive contains several files that are not artwork, an exhibition copy that is not in a directory, and the preservation copy, the dpx sequence, which is stored in a directory by itself. The conservator chooses to prioritize moving the preservation copy. They choose to select an individual directory to move to the staging directory.

Because the conservator is only moving a directory full of dpx files, they do not choose to run all of the metadata tools. 

The art conservator opens the output_template.csv file stored in `INPT/csv_templates/` 

```
Move all files to staging directory,0
Select files to move to staging directory,1
Run all tools,0
Run tree on volume,1
Run siegfried on files in staging directory,0
Run MediaInfo on video files in staging directory,0
Run Exiftool on media files in staging directory,0
Create framdemd5 output for video files in staging directory,0
Create QCTools reports for video files in staging directory,0
```

They choose to run tree, to document the directory structure of the volume.    
They choose not to run siegfried, because all of the file types are the same. Running sigfried on a large set of files that are all the same type is redundant, the output would be the same for each.     
The conservator also chooses not to run MediaInfo or Exiftool for the same reason, the output for each of the dpx files would be the same, and there are many dpx files in a sequence.     
Ffmpeg’s frame md5 function and QCTools are only for audio and video files, but to avoid any complications, the conservator chooses not to run these either. 

With these selections filled in, the conservator saves the csv as `output.csv`  

Running start_input.sh with these two csv files provided as input will result in identifying the artwork file, creating the staging directory, creating a checksum manifest of the directory containing the dpx sequence, transferring the directory to the staging directory, performing a fixity check, running "tree" on the external hard drive, and finally copying the checksum manifest and the "tree" output to the artwork file.    
The conservator can process the exhibition copy later using start_output.sh (as described in Use Case 3).

The conservator provides the filled out csv files to start_input.sh like this:    
`./start_input.sh input.csv output.csv`

start_input.sh will output it's actions to terminal and to the log file as it identifies variables from the input.csv or from inference. 

When the script attempts to identify the “Condition_Tmt Reports” directory and the “Technical Info_Specs” directory, because the artwork file only stores preliminary information about the artwork, the directories do not match the expected structure. 

```
*************************************************
 
The artwork file does not match expected directory structure. 
Cannot find Condition_Tmt Reports directory 
 See directories listed below 


/path/to/artwork_files/McTest, Tess
└── time-based media
    └── 00.00_Untitled
        ├── Acquisition and Registration
        ├── Artist Interaction
        ├── Photo-Video Documentation
        ├── Research
        │   └── Correspondence
        └── Trash


8 directories, 0 files
 _____________________________________ 
/ Select a directory to create the    \
| Condition_Tmt Reports directory, or |
\ choose to quit:                     /
 ------------------------------------- 
        \   ^__^
         \  (oo)\_______
            (__)\       )\/\
                ||----w |
                ||     ||
1) /path/to/artwork_files/McTest, Tess  3) Quit
2) Enter path to parent directory
```

As shown in the example above, the script produces a tree output of the artwork file, showing the existing directories. The conservator is prompted to enter a path to an existing directory (option 2), or simply use the parent directory of the artwork file (option 1). For expedience sake, the conservator chooses to use the parent directory of the artwork file, and plans to place the resulting metadata files in the correct directories later. 

If the conservator had more time, they could choose to create a new directory to act as the “Condition_Tmt Report” directory, and then drag and drop the directory into terminal. 

The artwork file does not have a “Technical Info_Specs” directory either, so the conservator goes through the same process, once again selecting the parent directory.

With the “Condition_Tmt Report” directory and the “Technical Info_Specs” directory now identified, start_input.sh will seamlessly transition to start_output.sh. 

The conservator is then prompted to choose whether to transfer all of the files on the external hard drive to the staging directory, to choose specific files, or specific directories. 

Following the instructions displayed in terminal, the conservator chooses the preservation copy directory containing the dpx sequence, and then confirms their selection by pressing enter. 

Because all other selections have been made via the output.csv, no further action is required. start_output.sh will proceed in creating a checksum manifest of the directory containing the dpx sequence, transferring the directory to the staging directory, performing a fixity check, running "tree" on the external hard drive, and finally copying the checksum manifest and the "tree" output to the artwork file.  


## Use Case 3

While transferring files from an artist provided hard drive, a conservator prioritizes transferring the highest quality copies provided, which are all stored in one directory. The files are fully processed with INPT and eventually uploaded into SI DAMS. Later, the conservator decides to transfer the artist-provided exhibition copy off of the hard drive as well.

The conservator locates the artwork file created when the preservation copy was processed. Inside the “Technical Info_Specs” directory there is a csv file created by INPT:
`McTest_00.00_2024-03-08-11.57.57.csv`

The INPT created csv file contains all of the information collected by start_input.sh (artist's name, accession number, artwork file path, staging directory path, etc.). With this information collected, the conservator can skip running start_input.sh and move straight to start_output.sh.

The conservator then creates an output csv, choosing to select individual files to copy to the staging directory, and to run all metadata tools.
```
Move all files to staging directory,0
Select files to move to staging directory,1
Run all tools,1
Run tree on volume,0
Run siegfried on files in staging directory,0
Run MediaInfo on video files in staging directory,0
Run Exiftool on media files in staging directory,0
Create framdemd5 output for video files in staging directory,0
Create QCTools reports for video files in staging directory,0
```

However, the high quality copies of the files are still in the staging directory from the original transfer. INPT will run metadata tools on all files in the staging directory. Because those high quality files are already in DAMS, the conservator opts to delete the high quality files in the staging directory. This way the tools will only run on the files being transferred during this process.

The conservator provides the filled out csv files to start_output.sh like this:    
`./start_output.sh input.csv output.csv`

start_output.sh sources the staging directory location, volume name, and other relevant variables from the input csv file. The artwork file is searched for checksum manifests.

If an existing manifest is found, the previously transferred files are presented in a terminal prompt:
```
 _________________________________________ 
/ Checksum manifest found in Artwork      \
| File! Checksums from the following      |
| files were found in                     |
| /Volumes/Shared/departments/            |
| CONSERVATION/ARTWORK FILES/McTest,      |
| Test/time-based                         |
| media/00.00_Title/Technical             |
\ Info_Specs:                             /
 ----------------------------------------- 
        \   ^__^
         \  (oo)\_______
            (__)\       )\/\
                ||----w |
                ||     ||
some_dir/preservation_copy.mov

Copy all files from the volume to the staging directory?
1) yes				 3) no, specific files
2) no, only certain directories	 4) none
#? 
```

The conservator chooses option 3, and selects the single exhibition video file from the external hard drive. 
```
_________________________________________ 
/ Select individual files from the list   \
| below, one at a time. Type the          |
| corresponding number and press enter to |
| select one. Repeat as necessary. Once   |
| all the directories have been selected, |
\ press enter again.                      /
 ----------------------------------------- 
        \   ^__^
         \  (**)\_______
            (__)\       )\/\
             U  ||----w |
                ||     ||
Avaliable options:
  1 ) /Volumes/external_hard_drive/some_dir/preservation_copy.mov
  2 ) /Volumes/external_hard_drive/exhibition_copy.mov
  3 ) /Volumes/external_hard_drive/installation_instructions.pdf
  4 ) /Volumes/external_hard_drive/still_image1.tiff
  5 ) /Volumes/external_hard_drive/still_image2.tiff
Check an option (again to uncheck, ENTER when done):
      2
Avaliable options:
  1 ) /Volumes/external_hard_drive/some_dir/preservation_copy.mov
  2+) /Volumes/external_hard_drive/exhibition_copy.mov
  3 ) /Volumes/external_hard_drive/installation_instructions.pdf
  4 ) /Volumes/external_hard_drive/still_image1.tiff
  5 ) /Volumes/external_hard_drive/still_image2.tiff
Check an option (again to uncheck, ENTER when done):

2024-03-10 - 10.25.40 - The selected files are: /Volumes/external_hard_drive/exhibition_copy.mov

```

With the file selected and the "Run all tools" option selected in the output.csv file, the script will run the rest of the process automatically. The result will be the exhibition copy transferred from the external hard drive to the staging directory, fixity verified, and metadata describing the exhibition copy being created, added to the artwork folder, and stored in sidecars in the staging directory.

# Code Structure

As described throughout this documentation most functions of INPT are run from start_input.sh or start_output.sh.    
Those scripts reference functions stored in separate files. The functions are divided across files mostly for clarities sake, but also to simplify updating individual aspects of the code. 

```
INPT
├── INPT
│   ├── input_functions
│   │   ├── finddirs.sh
│   │   ├── makecsv.sh
│   │   └── makelog.sh
│   ├── output_functions
│   │   ├── move
│   │   │   ├── copyit.py
│   │   │   ├── movefiles.sh
│   │   │   ├── runmovefiles.sh
│   │   │   └── selectfiles.sh
│   │   └── tools
│   │       ├── runtools.sh
│   │       ├── selecttools.sh
│   │       └── tools.sh
│   ├── start_input.sh
│   └── start_output.sh
├── README.md
├── Roadmap.md
├── csv_templates
│   ├── input_template.csv
│   └── output_template.csv
├── dependency_check.sh
├── logs
│   ├── copyit
│   │   ├── copyit_logs
│   │   └── manifests
│   │       └── old_manifests
│   └── samplelog.log
├── sample_files
└── tests
```
Functions stored in start_input.sh and start_output.sh are typically preceeded by a `source` command which retrieves the function from the ".sh" file the function is stored in.

For example:
```shell
source "${script_dir}"/input_functions/makelog.sh
MakeLog
```
This code "sources" the `MakeLog` function from INPT/input_functions/makelog.sh

To troubleshoot or examine a particular function, first look at the code in start_input.sh or start_outpt.sh to locate the file the function is stored in. Bear in mind that the function may reference other functions.

Which functions are run is predominently determined by "if this, then that" logic, conditional on known variables (or user selections). 

For example:
```shell
if [[ -n "${input_csv}" ]] ; then
# if input_csv has been assigned, then
    if [[ -n "${ArtFile}" ]] && [[ -z "${ArtistLastName}" ]] ; then
    # if artwork file has been assigned, but artist's name is unknown
        source "${script_dir}"/input_functions/finddirs.sh
        ParseArtFile "${ArtFile}"
        # parse artwork file path for artist first and last name
        FindAccessionNumber 
        # parse artwork file for accession
    fi
    if [[ -z "${ArtistLastName}" ]] ; then
    # if artist's name has not been assigned, then:
        source "${script_dir}"/input_functions/finddirs.sh
        if [[ "$typo_check" == true ]] ; then
            name_again=yes
            ConfirmArtistsName
        else
            InputArtistsName
        fi
    elif [[ -n "${ArtistLastName}" ]] && [[ -z "${ArtFile}" ]]; then
    # if the artist's last name is known and the Artwork File path is still unknown, then assume artist's name is from csv
        logNewLine "Artist name found in CSV: ${ArtistFirstName} ${ArtistLastName}" "$WHITE"
        # consider adding a check here. If artist's name doesn't match any in artwork folders then confirm? Use different artist name database?
    fi
else
    source "${script_dir}"/input_functions/finddirs.sh
    if [[ "$typo_check" == true ]] ; then
        name_again=yes
        ConfirmArtistsName
    else
        InputArtistsName
    fi
fi
...
```

In the code segment above, the artwork file and the artist's name are identified.

If the input csv is "non-zero", `if [[ -n "${input_csv}" ]] ; then`     

and the artwork file path is also non-zero, but the artist's last name is not known, `if [[ -n "${ArtFile}" ]] && [[ -z "${ArtistLastName}" ]] ; then`    

then the artwork file was provided by the csv but not the artist's name. So the artwork file will be parsed to infer the artist's name.

If the artwork file is not known, and the artist's last name is not known `if [[ -z "${ArtistLastName}" ]] ; then`

then the artist's name was not provided by in the input csv and so the user will be prompted to input it.   

If the artist's last name is known, then it was read from the input csv file.    

Finally if the input csv is not known, then the artist's name must be manually input, so the user will be prompted to input it. 

In this way, start_input and start_output rely on determining what necessary information has not yet been found, and prompting the user for inputs or selections where necessary.
* * *

Similair, repetative code is streamlined through functions as well. 

For example:
```shell
ConfirmInput () {
  local var="$1"
	local var_display_name="$2"
	local prompt_context="$3"
  
  select_again=yes
	
  while [[ "$select_again" = yes ]] ; do
		echo -e "\nManually input the ${var_display_name}"
        if [[ ! -z "$prompt_context" ]] ; then
        # Optional additional argument to provide context on prompt for input
            echo "$prompt_context"
			## vars w/ spaces passed to prompt_context not displaying correctly! 
        fi
		read -e user_input
        # Read user input as variable $user_input
        user_input="${user_input%"${user_input##*[![:space:]]}"}"
        # If the user_input path is dragged and dropped into terminal, the trailing whitespace can eventually be interpreted as a "\" which breaks the CLI tools.
		logNewLine "The ${var_display_name} manually input: ${user_input}" "$CYAN"
        if [[ "$typo_check" == true ]] ; then
        # If typo check option is turned on, then confirm user_input
            cowsay "Just checking for typos - Is the ${var_display_name} entered correctly?"
            select options in "yes" "no, go back a step"; do
                case $options in
                    yes)
                        select_again=no
                        break;;
                    "no, go back a step")
                        select_again=yes
                        unset user_input
                        break;;
                esac
            done
            if [[ "$select_again" = yes ]] ;
                    then echo -e "Let's try again"
            fi
        else
            select_again=no
        fi
	eval "${var}=\${user_input}"
	export var="${var}"
	done
}
```
The `ConfirmInput` function above is used several times in the finddis.sh script to confirm manually input variables and assign them accordingly:
```shell
while [[ -z "$accession" ]] ; do
		ConfirmInput accession "artwork's accession number" "For new acquisitions, enter accession number in '####.###' format"
		export accession="${accession}"
	done
	while [[ -z "$title" ]] ; do
    	ConfirmInput title "artwork's title"
		export title="${title}"
	done
```
In the example above `ConfirmInput` is used to collect the $accession and $title variables (if they are unknown).
* * *
INPT uses code from several open source projects. 

A large portion of INPT/input_functions/makelog.sh is lifted from the [AMIA Open Source project loglog](https://github.com/amiaopensource/loglog)

Transfer of either an entire volume or selected driectories use INPT/output_functions/move/copyit.py 

This file is a slightly modifed version of the copyit.py file created by Kieran O'Leary as part of the IFIscript project: https://github.com/kieranjol/IFIscripts

Copyright notices are stored in the INPT code files referenced above, and reproduced here:
IFIscripts:
```
    MIT License

    Copyright (c) 2015-2018 Kieran O'Leary for the Irish Film Institute.

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in
    all copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
    THE SOFTWARE.
```

loglog:
```
    Copyright (C) 2021  Eddy Colloton and Morgan Morel

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>.
```
* * *