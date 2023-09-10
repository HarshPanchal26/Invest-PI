export function formatTextForDisplay(text: string) : string {
    // Replace newlines with <br> tags
    text = text.replace(/\n/g, '<br>');
    // Replace spaces with &nbsp; for consecutive spaces
    text = text.replace(/ /g, '&nbsp;');
    return text;
}

export function decodeTextFromDisplay(text:string)  : string{
    // Replace "<br>" tags with newlines
    text = text.replace(/<br>/g, '\n');
  
    // Replace "&nbsp;" with spaces
    text = text.replace(/&nbsp;/g, ' ');
  
    return text;
}

