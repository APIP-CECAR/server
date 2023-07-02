(define (problem critical-thinking-pleanner)
	(:domain critical-thinking-planner)
	(:objects
		student_6492fe5fd8eb5727aea70eaa student_6492fe60d8eb5727aea70eb4 student_6492fe61d8eb5727aea70ebe  -student
	    n0ct n1obs01 n1obs02 n1obs03
        n1com01 n1com02 n1com03 
        n1cla01 n1cla02 n1cla03
        n1des01 n1des02 n1des03 - cognitive-process
	)
	(:init		
		(precondition n0ct n1obs01)
		(precondition n0ct n1obs02)
		(precondition n0ct n1obs03)
		
		(precondition n1obs01 n1com01)
		(precondition n1obs01 n1com02)
		(precondition n1obs01 n1com03)
		
		(precondition n1obs02 n1com01)
		(precondition n1obs02 n1com02)
		(precondition n1obs02 n1com03)
		
		(precondition n1com01 n1cla01)
		(precondition n1com01 n1cla02)
		(precondition n1com01 n1cla03)
		
		(achieved-process student_6492fe5fd8eb5727aea70eaa n0ct)
		(achieved-process student_6492fe60d8eb5727aea70eb4 n0ct)
		(achieved-process student_6492fe61d8eb5727aea70ebe n0ct)
							
		(= (reward-progress-to n0ct n1obs01) 1)
        (= (reward-progress-to n0ct n1obs02) 2) 
        (= (reward-progress-to n0ct n1obs03) 1)
        
        (= (reward-progress-to n1obs01 n1com01) 1)
        (= (reward-progress-to n1obs01 n1com02) 1) 
        (= (reward-progress-to n1obs01 n1com03) 1)

        (= (reward-progress-to n1obs02 n1com01) 2)
        (= (reward-progress-to n1obs02 n1com02) 2) 
        (= (reward-progress-to n1obs02 n1com03) 2)
        
        (= (reward-progress-to n1com01 n1cla01) 1)
        (= (reward-progress-to n1com01 n1cla02) 1) 
        (= (reward-progress-to n1com01 n1cla03) 1)

        (= (cost-progress-to n0ct n1obs01) 1)
        (= (cost-progress-to n0ct n1obs02) 1) 
        (= (cost-progress-to n0ct n1obs03) 1)

        (= (cost-progress-to n1obs01 n1com01) 1)
        (= (cost-progress-to n1obs01 n1com02) 1) 
        (= (cost-progress-to n1obs01 n1com03) 1)    
        
        (= (cost-progress-to n1com01 n1cla01) 1)
        (= (cost-progress-to n1com01 n1cla02) 1) 
        (= (cost-progress-to n1com01 n1cla03) 1)
        
        (= (learning-path-cost) 0)
        (= (learning-path-reward)  0)  
	)
	(:goal
		(and (achieved-process student_6492fe5fd8eb5727aea70eaa n1cla03)
		(achieved-process student_6492fe60d8eb5727aea70eb4 n1cla03)
		(achieved-process student_6492fe61d8eb5727aea70ebe n1cla03)
		)
	)
	(:metric maximize(learning-path-reward))
)