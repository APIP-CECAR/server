(define (domain critical-thinking-reasoning)
        (:requirements :strips :fluents :typing  :negative-preconditions :adl)
        (:types student step thinkingskill dimension)
        (:predicates 
            (step-link ?from ?to -step)
            (student-evidences-step ?x - student ?y - step) 
        )
        (:functions
                (learning-path-time)
                 (learning-path-reward) 
                (time-required-step-link ?from ?to -step)  
                (reward-step-link ?from ?to -step)
        )
        (:action learning-progress
                :parameters(?x -student ?from ?to -step)
                :precondition (and 
                                   (student-evidences-step  ?x ?from)
                                   (not  (student-evidences-step  ?x ?to))                                
                               )
                :effect (and (student-evidences-step ?x ?to)
                             (increase (learning-path-reward) (reward-step-link ?from ?to))
                        ) 
        )
 ) 