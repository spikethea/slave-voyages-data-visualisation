

export function determineNationality (nationalityString: string) {
    // switch case statement for translating the SPSS code into readable 
    let nationality = null
    switch(Number(nationalityString)) {
      case 1:
        nationality = 'Spanish'
        break;
      case 2:
        nationality = 'Uruguayan'
      break;
      case 4:
        nationality = 'Portuguese'
      break;
      case 5:
        nationality = 'Brazilian'
      break;
      case 7:
        nationality = 'British'
      break;
      case 8:
        nationality = 'Dutch'
      break;
      case 9:
        nationality = 'American'
      break;
      case 10:
        nationality = 'French'
      break;
      case 11:
        nationality = 'Danish'
      break;
      case 12:
        nationality = 'German (Brandenburg)'
      break;
      case 13:
        nationality = 'Swedish'
      break;
      case 14:
        nationality = 'Norweigan'
      break;
      case 16:
        nationality = 'Argentine'
      break;
      case 17:
        nationality = 'Russian'
      break;
      case 18:
        nationality = 'Sardinian'
      break;
      case 19:
        nationality = 'Mexican'
      break;
      case 24:
        nationality = 'Genovese'
      break;
      case 25:
        nationality = 'Duchy of Courland'
      break;
      case 26:
        nationality = 'Prussian'
      break;
      case 26:
        nationality = 'German (Bremen)'
      break;
      default: nationality = 'Unknown';
    }

    return nationality;
}