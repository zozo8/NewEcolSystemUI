const prefix: string = '/api/';

// crud
export const deleteModelPath = (model: string, id: number): string =>
  prefix + model + 's?id=' + id;

export const deleteModelWithParamsPath = (
  model: string,
  params: string
): string => prefix + model + 's?' + params;

export const postModelPath = (model: string): string =>
  prefix + model + 's/Manage';

export const getModelPath = (model: string, id: number): string =>
  prefix + model + 's?id=' + id;

export const getModelListPath = (model: string): string => prefix + model + 's';

export const columnListPath = (id: number): string =>
  prefix + 'GridData?gridsDict=' + id;

export const columnListPathByName = (name: string): string =>
  prefix + 'GridData?gridsDict=' + name;

// login
export const loginToURPath = () => prefix + 'auth/login/';
export const authenticatePath = () => prefix + 'Home/Authenticate';
export const refreshTokenPath = () => prefix + 'Home/RefreshToken';

// tree
export const getInitTreeElementListPath = () =>
  prefix + 'BaseTreeFilteredsInit';
export const getTreeElementListPath = () => prefix + 'BaseTreeFiltereds';

//excel etc
export const getDataExport = () => prefix + 'GridDataExport';

//main page
export const getMainPageDiagramPercentages = () =>
  prefix + 'MainPageDiagramPercentages';

export const getProductsUnderMinimum = () => prefix + 'ProductsUnderMinimum';
