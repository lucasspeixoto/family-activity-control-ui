import { Select } from '@shared/models/select';

export const billCategoryOptions: Select[] = [
  { value: 'Supermercado', viewValue: 'Supermercado' },
  { value: 'Cartão de Crédito', viewValue: 'Cartão de Crédito' },
  { value: 'Aluguel', viewValue: 'Aluguel' },
  { value: 'Água', viewValue: 'Água' },
  { value: 'Luz/Energia', viewValue: 'Luz/Energia Elétrica' },
  { value: 'Internet', viewValue: 'Internet' },
  { value: 'Telefonia', viewValue: 'Telefonia' },
  { value: 'Transporte', viewValue: 'Transporte' },
  {
    value: 'Educação',
    viewValue: 'Educação (Escola/Faculdade/Cursos)',
  },
  {
    value: 'Saúde',
    viewValue: 'Saúde (Planos de Saúde/Medicamentos)',
  },
  { value: 'Gás', viewValue: 'Gás' },
  {
    value: 'Seguros',
    viewValue: 'Seguros (Carro, Casa, Vida)',
  },
  {
    value: 'Entretenimento',
    viewValue: 'Entretenimento (Streaming, Cinema)',
  },
  {
    value: 'Assinaturas',
    viewValue: 'Assinaturas (Revistas, Softwares)',
  },
  { value: 'Lazer e Viagens', viewValue: 'Lazer e Viagens' },
  { value: 'Manutenção de Veículos', viewValue: 'Manutenção de Veículos' },
  { value: 'Vestuário', viewValue: 'Vestuário' },
  { value: 'Alimentação Fora de Casa', viewValue: 'Alimentação Fora de Casa' },
  {
    value: 'Serviços Domésticos',
    viewValue: 'Serviços Domésticos (Faxineira, Jardinagem)',
  },
  {
    value: 'Empréstimos e Financiamentos',
    viewValue: 'Empréstimos e Financiamentos',
  },
  { value: 'Academia/Ginástica', viewValue: 'Academia/Ginástica' },
  {
    value: 'Cuidados Pessoais',
    viewValue: 'Cuidados Pessoais (Salão de Beleza, Barbearia)',
  },
  { value: 'Taxas Bancárias', viewValue: 'Taxas Bancárias' },
  { value: 'Doações/Caridade', viewValue: 'Doações/Caridade' },
  {
    value: 'Impostos e Taxas Governamentais',
    viewValue: 'Impostos e Taxas Governamentais',
  },
  {
    value: 'Animais de Estimação',
    viewValue: 'Animais de Estimação (Alimentação, Veterinário)',
  },
  {
    value: 'Hobbies e Atividades Recreativas',
    viewValue: 'Hobbies e Atividades Recreativas',
  },
  {
    value: 'Manutenção e Reparos da Casa',
    viewValue: 'Manutenção e Reparos da Casa',
  },
  { value: 'Presentes e Festas', viewValue: 'Presentes e Festas' },
  {
    value: 'Produtos de Limpeza e Higiene',
    viewValue: 'Produtos de Limpeza e Higiene',
  },
  { value: 'Combustível', viewValue: 'Combustível' },
  {
    value: 'Aplicativos de Transporte',
    viewValue: 'Aplicativos de Transporte (Uber, 99)',
  },
  {
    value: 'Cuidados com Crianças',
    viewValue: 'Cuidados com Crianças (Fralda, Creche, Babá)',
  },
  {
    value: 'Educação Continuada',
    viewValue: 'Educação Continuada (Cursos Online, Workshops)',
  },
  {
    value: 'Consultas Médicas e Dentárias',
    viewValue: 'Consultas Médicas e Dentárias',
  },
  { value: 'Psicoterapia', viewValue: 'Psicoterapia' },
  {
    value: 'Serviços de Streaming de Música',
    viewValue: 'Serviços de Streaming de Música',
  },
  { value: 'Jogos e Apps Mobile', viewValue: 'Jogos e Apps Mobile' },
  {
    value: 'Equipamentos Eletrônicos e Gadgets',
    viewValue: 'Equipamentos Eletrônicos e Gadgets',
  },
  {
    value: 'Serviços de Backup e Armazenamento em Nuvem',
    viewValue: 'Serviços de Backup e Armazenamento em Nuvem',
  },
  {
    value: 'Lavanderia e Lavagem a Seco',
    viewValue: 'Lavanderia e Lavagem a Seco',
  },
  { value: 'Materiais de Escritório', viewValue: 'Materiais de Escritório' },
  {
    value: 'Reparos e Melhorias no Jardim',
    viewValue: 'Reparos e Melhorias no Jardim',
  },
  {
    value: 'Ferramentas e Equipamentos',
    viewValue: 'Ferramentas e Equipamentos',
  },
  { value: 'Móveis e Decoração', viewValue: 'Móveis e Decoração' },
  { value: 'Taxas de Condomínio', viewValue: 'Taxas de Condomínio' },
  {
    value: 'Livros e Materiais Educativos',
    viewValue: 'Livros e Materiais Educativos',
  },
  {
    value: 'Consultoria Financeira e Contábil',
    viewValue: 'Consultoria Financeira e Contábil',
  },
  {
    value: 'Eventos e Atividades Culturais',
    viewValue: 'Eventos e Atividades Culturais (Teatro, Concertos)',
  },
  {
    value: 'Taxas de Licenciamento e Inspeção',
    viewValue: 'Taxas de Licenciamento e Inspeção (Veículos, Imóveis)',
  },
];

export const billTypeOptions: Select[] = [
  { value: 'FIXED', viewValue: 'Gasto Fixo' },
  { value: 'VARIABLE', viewValue: 'Gasto Variável' },
];
