export const mockSit = {
  id: 'sit-001',
  sitterName: 'Sarah M.',
  sitterAvatar: null,
  startDate: '14 June 2025',
  endDate: '21 June 2025',
  daysUntilStart: 18,
  numberOfPets: 2,
  petNames: ['Miso', 'Pepper'],
  location: 'London, UK',
  cancellationPolicy: 'Moderate',
}

export const cancellationReasons = [
  { id: 'plans-changed',    label: 'My plans have changed' },
  { id: 'found-alternative', label: 'I found an alternative' },
  { id: 'emergency',        label: 'I have a personal emergency' },
  { id: 'sitter-issue',     label: 'I have concerns about the sitter' },
  { id: 'other',            label: 'Other' },
]
