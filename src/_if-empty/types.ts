export interface Data {
  suggestions: Array<SuggestionType>;
  picks: Array<PickType>;
  inputSchema: any;
  judged_field: any;
}



export type SuggestionType = {
  label: string;
  insertText: string;
  detail?: string;
  properties?: Array<SuggestionType>;
};
