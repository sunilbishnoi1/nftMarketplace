# Contributing to NFT Marketplace

## Project Structure

```
src/
├── components/     # React components (e.g., NftCard.tsx, ListGroup.tsx)
├── contracts/     # Solidity smart contracts
├── types/         # TypeScript definitions
└── App.tsx        # Main application component
```

## Development Guidelines

### Components

- Create new components in `src/components/`
- Use TypeScript (`.tsx`) and functional components
- Naming: Use PascalCase (e.g., `NftCard.tsx`, `CollectionGrid.tsx`)
- Example component structure:

  ```tsx
  interface NftCardProps {
    tokenId: string;
    image: string;
    name: string;
    price: string;
  }

  export const NftCard: React.FC<NftCardProps> = ({
    tokenId,
    image,
    name,
    price,
  }) => {
    // Component logic
  };
  ```

### Smart Contracts

- Add new contracts in `src/contracts/`
- Update migrations in `migrations/` folder

### JSON Files Maintenance

- `package.json`: Document new dependencies
- `truffle-config.js`: Update network settings if needed
- Track ABI changes in contract JSON files
- Keep contract addresses updated in config files

### Workflow

1. Create feature branch: `git checkout -b feature/your-feature`
2. Make changes
3. Test locally:
   - `yarn install` (for new dependencies)
   - `yarn start` (test frontend)
   - `truffle test` (for contracts)

### Code Style

- Use Tailwind CSS for styling
- Follow TypeScript best practices
- Run linter before commits
- Keep components small and focused