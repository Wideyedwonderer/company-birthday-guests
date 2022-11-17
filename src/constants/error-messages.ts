export const ErrorMessages = {
    WRONG_TXT_LINE_FORMAT: 'Wrong txt line format. All lines should be in the following format "{"latitude": "42.6264989", "partner_id": 3, "name": "Name of partner", "longitude": "23.4097679"}"',
    DUPLICATE_PARTNER_IDS: (ids: number[]) => "Found the following duplicated partner ids in the txt file: " + ids.join(' ')
}