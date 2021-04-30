# emailsInput
To initilize the EI to use you should have first of to import the style file and after that the js file from the EI files to your own project.<br/>

the you can use the init function from the emailsInput moddule which is included in the JS file.<br/>

there are a few options which are madatory and should be added set to use.<br/>

the options should be passed as an oject to init method.<br/>

# container:is the element which you want to add the emailsInput in.
# position: is the place which you want to have the emailsInput in the valid value are : beforebegin,afterbegin, beforeend, afterend
# showCountButtonContent:the text would be shown in to the show count button
# addRandomButtonContent:the text would be shown into the add a test email button
```
      emailsInput.init({
        container,
        position: "afterbegin",
        showCountButtonContent: "show valid emails count",
        addRandomButtonContent: "add random email",
      });
```

to edit the styles you should have edit the style css file.
