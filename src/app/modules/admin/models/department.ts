// Wyeksportowałbym to jako interfejs, chyba że chcesz mieć koniecznie możliwość utworzenia
// tego jako NewDepartment albo zaimportowania (zasadniczo - w tym wypadku - nie wygląda to na konieczne :))
export class Department {
  id?: number;
  departmentName?: string;
  clientId?: number;
  clientName?: string;
  address?: string;
  nip?: string;
  elementTypeId?: number;
}
