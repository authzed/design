# Custom Instructions

## Documentation Management

### Essential Documentation Structure

The project maintains a `client_docs` folder in the root directory containing critical documentation files:

#### 1. projectRoadmap.md
- **Purpose**: Track high-level goals, features, and progress
- **Update Frequency**: When high-level goals change or tasks complete
- **Structure**:
  ```markdown
  ## Project Goals
  - [ ] Implement feature X
  - [x] Complete feature Y
  
  ## Key Features
  - Feature descriptions
  - Implementation status
  
  ## Completion Criteria
  - Specific requirements
  - Testing criteria
  
  ## Completed Tasks
  - [YYYY-MM-DD] Task description
  ```

#### 2. currentTask.md
- **Purpose**: Detail current objectives and context
- **Update Frequency**: After each task/subtask completion
- **Structure**:
  ```markdown
  ## Current Objective
  [Task description]

  ## Context
  [Background information]

  ## Next Steps
  1. [Step description]
  2. [Step description]
  ```

#### 3. techStack.md
- **Purpose**: Document technology choices
- **Update Frequency**: On significant tech decisions
- **Structure**:
  ```markdown
  ## Frontend
  - Framework details
  - State management

  ## Backend
  - Server technology
  - Database choices

  ## Development Tools
  - Build tools
  - Testing frameworks
  ```

#### 4. codebaseSummary.md
- **Purpose**: Project structure overview
- **Update Frequency**: On structural changes
- **Structure**:
  ```markdown
  ## Key Components
  - Component descriptions
  
  ## Data Flow
  - System interactions
  
  ## Recent Changes
  - [YYYY-MM-DD] Change description
  ```

### Documentation Guidelines

1. **File Creation**
   - Create additional reference docs as needed
   - Document new files in codebaseSummary.md

2. **Update Triggers**
   - Significant architectural changes
   - New feature implementations
   - Technology stack modifications
   - Major bug fixes

## Workflow Instructions

### Task Execution Process

1. **Initial Review**
   - Read projectRoadmap.md
   - Review currentTask.md
   - Check techStack.md
   - Study codebaseSummary.md

2. **Task Planning**
   ```markdown
   <thinking>
   - Analyze requirements
   - Review project goals
   - Examine context
   - Study tech stack
   - Review codebase
   - Consider feedback
   - Plan implementation
   - Identify challenges
   </thinking>
   ```

3. **Documentation Updates**
   - Update currentTask.md with plan
   - Modify relevant docs during development
   - Keep documentation synchronized

4. **Implementation**
   - Execute planned changes
   - Commit frequently
   - Update documentation
   - Run tests regularly

5. **Review Process**
   ```markdown
   <thinking>
   - Review implementation
   - Analyze impact
   - Consider optimizations
   - Reflect on feedback
   - Plan improvements
   </thinking>
   ```

6. **Final Steps**
   - Update projectRoadmap.md
   - Run final tests
   - Document completion

### Best Practices

1. **Documentation Quality**
   - Clear and concise writing
   - Complete information
   - Regular updates
   - Consistent formatting

2. **Testing Protocol**
   - Regular testing throughout development
   - Comprehensive test coverage
   - Document test results

3. **Feedback Integration**
   - Review user feedback
   - Prioritize improvements
   - Document decisions

4. **Optimization**
   - Analyze workflow efficiency
   - Implement improvements
   - Document optimizations

## Workflow Diagram

```markdown
Start
  │
  ├─ Read Documentation
  │   ├─ projectRoadmap.md
  │   ├─ currentTask.md
  │   ├─ techStack.md
  │   └─ codebaseSummary.md
  │
  ├─ Plan Task
  │   ├─ Analyze Requirements
  │   ├─ Review Context
  │   └─ Identify Challenges
  │
  ├─ Execute Task
  │   ├─ Implement Changes
  │   ├─ Run Tests
  │   └─ Update Documentation
  │
  ├─ Review
  │   ├─ Verify Implementation
  │   ├─ Check Documentation
  │   └─ Plan Improvements
  │
  └─ Complete
      ├─ Final Testing
      └─ Update Roadmap
```

## Critical Reminders

1. **Documentation First**
   - Always review documentation before starting
   - Keep documentation updated during development

2. **Testing Priority**
   - Test frequently
   - Document test results
   - Address issues immediately

3. **Communication**
   - Clear documentation updates
   - Comprehensive change descriptions
   - Regular progress updates

4. **Quality Assurance**
   - Follow best practices
   - Maintain code quality
   - Ensure documentation accuracy