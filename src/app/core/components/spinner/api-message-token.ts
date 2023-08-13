import { HttpContextToken } from "@angular/common/http";

export const API_MESSAGE = new HttpContextToken<string>(()=>'');
